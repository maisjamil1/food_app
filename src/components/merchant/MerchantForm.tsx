import { useEffect, useState, useCallback, memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { merchantsApi } from '@/services/api';
import { Merchant } from '@/types';
import { UPLOADS_URL } from '@/config/constants';
import {Store} from "lucide-react";
// import placeholderImage from '../assets/placeholder.svg';

interface MerchantFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Merchant;
}

interface ImagePreviewProps {
  src: string;
  alt: string;
}

const ImagePreview = memo(({ src, alt }: ImagePreviewProps) => (
  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
    {/*<img*/}
    {/*  src={src}*/}
    {/*  alt={alt}*/}
    {/*  className="w-full h-full object-cover"*/}
    {/*  onError={(e) => {*/}
    {/*    const target = e.target as HTMLImageElement;*/}
    {/*    target.src = placeholderImage;*/}
    {/*  }}*/}
    {/*/>*/}
    <Store/>
  </div>
));

ImagePreview.displayName = 'ImagePreview';

const MerchantForm = ({ open, onClose, onSuccess, initialData }: MerchantFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    cashbackPercentage: '',
    status: 'active',
    isCashbackEnabled: false,
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logo2, setLogo2] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [logo2Preview, setLogo2Preview] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        nameEn: initialData.nameEn,
        nameAr: initialData.nameAr,
        descriptionEn: initialData.descriptionEn,
        descriptionAr: initialData.descriptionAr,
        cashbackPercentage: initialData.cashbackPercentage.toString(),
        status: initialData.status,
        isCashbackEnabled: initialData.isCashbackEnabled,
      });
      if (initialData.logo) {
        setLogoPreview(`${UPLOADS_URL}/${initialData.logo}`);
      }
      if (initialData.logo2) {
        setLogo2Preview(`${UPLOADS_URL}/${initialData.logo2}`);
      }
    } else {
      setFormData({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        cashbackPercentage: '',
        status: 'active',
        isCashbackEnabled: false,
      });
      setLogo(null);
      setLogo2(null);
      setLogoPreview('');
      setLogo2Preview('');
    }
  }, [initialData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'logo2') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'logo') {
        setLogo(file);
        setLogoPreview(URL.createObjectURL(file));
      } else {
        setLogo2(file);
        setLogo2Preview(URL.createObjectURL(file));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      if (logo) formDataToSend.append('logo', logo);
      if (logo2) formDataToSend.append('logo2', logo2);

      if (initialData) {
        await merchantsApi.update(initialData.id, formDataToSend);
      } else {
        await merchantsApi.create(formDataToSend);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting merchant:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Create'} Merchant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameEn">Name (English)</Label>
              <Input
                id="nameEn"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameAr">Name (Arabic)</Label>
              <Input
                id="nameAr"
                name="nameAr"
                value={formData.nameAr}
                onChange={handleInputChange}
                required
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="descriptionEn">Description (English)</Label>
              <Input
                id="descriptionEn"
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionAr">Description (Arabic)</Label>
              <Input
                id="descriptionAr"
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleInputChange}
                required
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cashbackPercentage">Cashback Percentage</Label>
              <Input
                id="cashbackPercentage"
                name="cashbackPercentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.cashbackPercentage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isCashbackEnabled"
              checked={formData.isCashbackEnabled}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isCashbackEnabled: checked }))}
            />
            <Label htmlFor="isCashbackEnabled">Enable Cashback</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-4">
                {logoPreview && <ImagePreview src={logoPreview} alt="Logo preview" />}
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="flex-1"
                  required={!initialData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo2">Logo 2</Label>
              <div className="flex items-center gap-4">
                {logo2Preview && <ImagePreview src={logo2Preview} alt="Logo 2 preview" />}
                <Input
                  id="logo2"
                  name="logo2"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo2')}
                  className="flex-1"
                  required={!initialData}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MerchantForm);
