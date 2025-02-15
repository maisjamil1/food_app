import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { merchantsApi } from "../services/api";
import { MerchantWithDetails } from "@/types";
import { UPLOADS_URL } from "../config/constants";
import {Store} from "lucide-react";

const MerchantDetailsPage = () => {
  const [merchants, setMerchants] = useState<MerchantWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMerchant, setExpandedMerchant] =
    useState<MerchantWithDetails | null>(null);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const response = await merchantsApi.getAllWithDetails();
      setMerchants(response.data.data || []);
    } catch (error) {
      console.error("Error fetching merchants:", error);
    } finally {
      setLoading(false);
    }
  };

  const merchantColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "logo",
      headerName: "Logo",
      width: 100,
      renderCell: (params) => (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <Store/>
          {/*<img*/}
          {/*  src={*/}
          {/*    params.value ? `${UPLOADS_URL}/${params.value}` : placeholderImage*/}
          {/*  }*/}
          {/*  alt="Merchant logo"*/}
          {/*  className="w-full h-full object-cover"*/}
          {/*  onError={(e) => {*/}
          {/*    const target = e.target as HTMLImageElement;*/}
          {/*    target.src = placeholderImage;*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      ),
    },
    {
      field: "nameEn",
      headerName: "Name (English)",
      flex: 1,
    },
    {
      field: "nameAr",
      headerName: "Name (Arabic)",
      flex: 1,
    },
    {
      field: "branches",
      headerName: "Branches",
      width: 100,
      renderCell: (params) => params.value.length,
    },
    {
      field: "subUsers",
      headerName: "Sub Users",
      width: 100,
      renderCell: (params) => params.value.length,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpandedMerchant(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const branchColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            params.value
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </div>
      ),
    },
  ];

  const subUserColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  const offerColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "titleEn", headerName: "Title (English)", flex: 1 },
    { field: "titleAr", headerName: "Title (Arabic)", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
          {/*<img*/}
          {/*  src={params.value ? `${UPLOADS_URL}/${params.value}` : placeholderImage}*/}
          {/*  alt="Offer"*/}
          {/*  className="w-full h-full object-cover"*/}
          {/*  onError={(e) => {*/}
          {/*    e.currentTarget.src = placeholderImage;*/}
          {/*  }}*/}
          {/*/>*/}
          <Store/>

        </div>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            params.value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4 py-6">
      <Card>
        <CardContent className="p-0">
          <DataGrid
            rows={merchants}
            columns={merchantColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick
          />
        </CardContent>
      </Card>

      {expandedMerchant && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Branches for {expandedMerchant.nameEn}</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setExpandedMerchant(null)}
                >
                  Close Details
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataGrid
                rows={expandedMerchant.branches}
                columns={branchColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sub Users for {expandedMerchant.nameEn}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DataGrid
                rows={expandedMerchant.subUsers}
                columns={subUserColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offers for {expandedMerchant.nameEn}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DataGrid
                rows={expandedMerchant.offers}
                columns={offerColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MerchantDetailsPage;
