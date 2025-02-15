import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Plus,
  Eye,
  Store
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import MerchantForm from "../components/merchant/MerchantForm";
import { merchantsApi } from "../services/api";
import {Merchant} from "@/types";
import { UPLOADS_URL } from "../config/constants";

const MerchantLogo = ({ value }: { value: string }) => {
  if (!value) return null;

  return ( <div className={"flex items-center h-full"} ><Store className={""}/></div>
 //    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
 // <img
 //              src={`${UPLOADS_URL}/${value}`}
 //              alt="Merchant logo"
 //              className="w-full h-full object-cover"
 //          />
 //
 //    </div>
  );
};

const MerchantsPage = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | undefined>();
  const [loading, setLoading] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [cashbackConfirmation, setCashbackConfirmation] = useState<{
    merchantId: number;
    enabled: boolean;
  } | null>(null);

  const fetchMerchants = useCallback(async () => {
    try {
      const response = await merchantsApi.getAll();
      const merchantsData = response.data.data || [];
      setMerchants(merchantsData);
    } catch (error) {
      console.error("Error fetching merchants:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (window.confirm("Are you sure you want to delete this merchant?")) {
        try {
          await merchantsApi.delete(id);
          fetchMerchants();
        } catch (error) {
          console.error("Error deleting merchant:", error);
        }
      }
    },
    [fetchMerchants]
  );

  const handleEdit = useCallback((merchant: Merchant) => {
    setSelectedMerchant(merchant);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsCreateDialogOpen(false);
    setSelectedMerchant(undefined);
  }, []);

  const handleViewDetails = useCallback(
    (id: number) => {
      navigate(`/merchants/${id}`);
    },
    [navigate]
  );

  const handleCashbackToggle = useCallback((merchantId: number, newStatus: boolean) => {
    setCashbackConfirmation({ merchantId, enabled: newStatus });
    setIsConfirmDialogOpen(true);
  }, []);

  const handleConfirmCashback = useCallback(async () => {
    if (!cashbackConfirmation) return;

    try {
      await merchantsApi.toggleCashback(
        cashbackConfirmation.merchantId,
        cashbackConfirmation.enabled
      );
      fetchMerchants();
    } catch (error) {
      console.error("Error updating cashback status:", error);
    } finally {
      setIsConfirmDialogOpen(false);
      setCashbackConfirmation(null);
    }
  }, [cashbackConfirmation, fetchMerchants]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
      },
      {
        field: "logo",
        headerName: "Logo",
        width: 100,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => <MerchantLogo value={params.value} />,
      },
      {
        field: "nameEn",
        headerName: "Name (English)",
        flex: 1,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="font-medium text-gray-900">{params.value}</div>
        ),
      },
      {
        field: "nameAr",
        headerName: "Name (Arabic)",
        flex: 1,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="font-medium text-gray-900 text-right">
            {params.value}
          </div>
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
        field: "descriptionAr",
        headerName: "Description (Arabic)",
        flex: 1.5,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="text-gray-600 text-right">{params.value}</div>
        ),
      },
      {
        field: "cashbackPercentage",
        headerName: "Cashback %",
        width: 120,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="text-gray-900 font-medium">{params.value}%</div>
        ),
      },
      {
        field: "isCashbackEnabled",
        headerName: "Cashback Status",
        width: 150,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="flex items-center gap-2">
            <Switch
              checked={params.value}
              onCheckedChange={(checked) => handleCashbackToggle(params.row.id, checked)}
            />
            <span className={`text-sm font-medium ${
              params.value ? "text-green-600" : "text-red-600"
            }`}>
              {params.value ? "Enabled" : "Disabled"}
            </span>
          </div>
        ),
      },
      {
        field: "cashbackStatusUpdatedAt",
        headerName: "Last Status Update",
        width: 200,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div className="text-gray-600">
            {new Date(params.value).toLocaleString()}
          </div>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        renderCell: (params) => (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              params.value === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {params.value}
          </div>
        ),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 150,
        headerClassName: "bg-gray-100 text-gray-800 font-semibold",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Eye className="w-4 h-4" />}
            label="View Details"
            onClick={() => handleViewDetails(params.row.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<EditIcon className="w-4 h-4" />}
            label="Edit"
            onClick={() => handleEdit(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className="w-4 h-4" />}
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleDelete, handleEdit, handleViewDetails, handleCashbackToggle]
  );

  return (
    <div className="space-y-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Merchants</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Merchant
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataGrid
          rows={merchants}
          columns={columns}
          autoHeight
          loading={loading}
          disableRowSelectionOnClick
        />
      </div>

      <MerchantForm
        open={isCreateDialogOpen || !!selectedMerchant}
        onClose={handleCloseForm}
        onSuccess={fetchMerchants}
        initialData={selectedMerchant}
      />

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cashback Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to {cashbackConfirmation?.enabled ? 'enable' : 'disable'} cashback for this merchant?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsConfirmDialogOpen(false);
                setCashbackConfirmation(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmCashback}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MerchantsPage;
