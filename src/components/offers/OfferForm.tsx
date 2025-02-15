import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { CreateOfferDto, Merchant, Offer } from '@/types';
import { merchantsApi, offersApi } from '@/services/api';

interface OfferFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Offer;
}

const OfferForm = ({ open, onClose, onSuccess, initialData }: OfferFormProps) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [formData, setFormData] = useState<CreateOfferDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    merchantId: initialData?.merchantId || 0,
  });

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await merchantsApi.getAll();
        setMerchants(response.data.data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };
    fetchMerchants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await offersApi.update(initialData.id, formData);
      } else {
        await offersApi.create(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Offer' : 'Create Offer'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <Label htmlFor="merchantId">Merchant</Label>
            <Select
              id="merchantId"
              value={formData.merchantId.toString()}
              onValueChange={(value) => setFormData({ ...formData, merchantId: Number(value) })}
              required
            >
              <option value="">Select a merchant</option>
              {merchants.map((merchant) => (
                <option key={merchant.id} value={merchant.id}>
                  {merchant.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferForm;
