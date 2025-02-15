import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferForm from "@/components/offers/OfferForm";
import { offersApi } from "@/services/api";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
  merchantId: number;
}

interface OfferBranch {
  id: number;
  offerId: number;
  branchId: number;
  branch: Branch;
  createdAt: string;
  updatedAt: string;
}

interface Offer {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  merchantId: number;
  createdAt: string;
  updatedAt: string;
  branches: OfferBranch[];
}

const OffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const response = await offersApi.getAll();
      const offersData = response.data.data || [];
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await offersApi.delete(id);
        fetchOffers();
      } catch (error) {
        console.error("Error deleting offer:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
    },
    {
      field: "titleEn",
      headerName: "Title (English)",
      flex: 1,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="font-medium text-gray-900">{params.value}</div>
      ),
    },
    {
      field: "titleAr",
      headerName: "Title (Arabic)",
      flex: 1,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="font-medium text-gray-900">{params.value}</div>
      ),
    },
    {
      field: "descriptionEn",
      headerName: "Description (English)",
      flex: 1.5,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="text-gray-600">{params.value}</div>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="text-gray-900">
          {new Date(params.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          })}
        </div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="text-gray-900">
          {new Date(params.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          })}
        </div>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div
          className={`px-2 py-1 rounded-full text-sm ${
            params.value
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "branches",
      headerName: "Branches",
      width: 200,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      renderCell: (params) => (
        <div className="text-gray-600">
          {params.value.map((b: OfferBranch) => b.branch.name).join(", ")}
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon className="h-4 w-4 text-blue-600" />}
          label="Edit"
          onClick={() => {
            setSelectedOffer(params.row);
            setIsFormOpen(true);
          }}
          className="hover:bg-blue-50"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon className="h-4 w-4 text-red-600" />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
          className="hover:bg-red-50"
        />,
      ],
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Offers</h1>
          <Button
            onClick={() => {
              setSelectedOffer(undefined);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Offer
          </Button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <DataGrid
            rows={offers}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            autoHeight
            disableRowSelectionOnClick
            className="border-0"
            sx={{
              "& .MuiDataGrid-cell": {
                borderColor: "#f0f0f0",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#f8fafc",
                borderBottom: "none",
              },
            }}
          />
        </div>
      </div>

      <OfferForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedOffer(undefined);
        }}
        onSuccess={fetchOffers}
        initialData={selectedOffer}
      />
    </div>
  );
};

export default OffersPage;
