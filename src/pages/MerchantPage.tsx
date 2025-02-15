import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { merchantsApi } from '../services/api';
import { Merchant } from '@/types';
import { Button } from '../components/ui/button';
import { Eye } from 'lucide-react';

const MerchantPage = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [showOffers, setShowOffers] = useState(false);

  const fetchMerchant = useCallback(async () => {
    if (!id) return;
    
    try {
      const response = await merchantsApi.getByIdWithDetails(parseInt(id, 10));
      setMerchant(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching merchant:', error);
      setError('Error loading merchant details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMerchant();
  }, [fetchMerchant]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error || !merchant) {
    return <div className="p-4 text-red-500">{error || 'Merchant not found'}</div>;
  }

  const branchColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { 
      field: 'isActive', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {params.value ? 'Active' : 'Inactive'}
        </div>
      ),
    },
  ];

  const subUserColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: () => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowOffers(true)}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Offers
        </Button>
      ),
    },
  ];

  const offerColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titleEn', headerName: 'Title (English)', flex: 1 },
    { field: 'titleAr', headerName: 'Title (Arabic)', flex: 1 },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 100,
      renderCell: (params) => (
        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
          <img 
            src={params.value} 
            alt="Offer"
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    { 
      field: 'startDate', 
      headerName: 'Start Date', 
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    { 
      field: 'endDate', 
      headerName: 'End Date', 
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    { 
      field: 'isActive', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {params.value ? 'Active' : 'Inactive'}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={merchant.logo} 
            alt={merchant.nameEn}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{merchant.nameEn}</h1>
          <p className="text-gray-500">{merchant.descriptionEn}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Cashback</h3>
          <p className="text-2xl font-bold text-gray-900">{merchant.cashbackPercentage}%</p>
          <p className={`text-sm ${merchant.isCashbackEnabled ? 'text-green-600' : 'text-red-600'}`}>
            {merchant.isCashbackEnabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Branches</h3>
          <p className="text-2xl font-bold text-gray-900">{merchant.branches.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Sub Users</h3>
          <p className="text-2xl font-bold text-gray-900">{merchant.subUsers.length}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Branches</h2>
          <div className="h-[400px]">
            <DataGrid
              rows={merchant.branches}
              columns={branchColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-white rounded-lg shadow"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Sub Users</h2>
          <div className="h-[400px]">
            <DataGrid
              rows={merchant.subUsers}
              columns={subUserColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-white rounded-lg shadow"
            />
          </div>
        </div>

        {showOffers && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Offers</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOffers(false)}
              >
                Hide Offers
              </Button>
            </div>
            <div className="h-[400px]">
              <DataGrid
                rows={merchant.offers}
                columns={offerColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                className="bg-white rounded-lg shadow"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantPage;
