import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image, Music, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PortfolioUploadProps {
  userId: string;
  artistId: string;
  onUploadComplete?: () => void;
}

const PortfolioUpload = ({ userId, artistId, onUploadComplete }: PortfolioUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; type: string; url: string }>>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(selectedFiles)) {
        // Validate file type
        const fileType = file.type.startsWith('image/') ? 'image' 
          : file.type.startsWith('video/') ? 'video'
          : file.type.startsWith('audio/') ? 'audio'
          : null;

        if (!fileType) {
          toast.error(`${file.name} is not a supported file type`);
          continue;
        }

        // Upload to Supabase Storage in user's folder
        const filePath = `${userId}/${Date.now()}-${file.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from('artist-portfolio')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('artist-portfolio')
          .getPublicUrl(filePath);

        // Save to artist_media table
        const { error: dbError } = await supabase
          .from('artist_media')
          .insert({
            artist_id: artistId,
            file_path: filePath,
            file_type: fileType,
            file_url: publicUrl,
            display_order: files.length,
          });

        if (dbError) throw dbError;

        setFiles(prev => [...prev, { name: file.name, type: fileType, url: publicUrl }]);
        toast.success(`${file.name} uploaded successfully`);
      }

      onUploadComplete?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (index: number) => {
    const file = files[index];
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('artist-portfolio')
        .remove([file.url.split('/').pop() || '']);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('artist_media')
        .delete()
        .eq('file_url', file.url);

      if (dbError) throw dbError;

      setFiles(prev => prev.filter((_, i) => i !== index));
      toast.success('File removed');
    } catch (error: any) {
      console.error('Remove error:', error);
      toast.error('Failed to remove file');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
      default: return <Upload className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="portfolio-upload">Portfolio Files</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload images, videos, or audio samples of your work
        </p>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <input
            id="portfolio-upload"
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <label htmlFor="portfolio-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => document.getElementById('portfolio-upload')?.click()}
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Images, videos, or audio files
            </p>
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files ({files.length})</Label>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioUpload;
