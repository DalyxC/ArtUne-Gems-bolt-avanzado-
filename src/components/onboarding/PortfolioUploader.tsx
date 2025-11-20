import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Image, Music, Video } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  file_path: string;
  file_type: 'image' | 'video' | 'audio';
  file_url: string;
  preview?: string;
}

interface PortfolioUploaderProps {
  artistId: string;
  onFilesUploaded: (files: UploadedFile[]) => void;
}

const PortfolioUploader = ({ artistId, onFilesUploaded }: PortfolioUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const getFileType = (file: File): 'image' | 'video' | 'audio' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'image'; // default
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newFiles: UploadedFile[] = [];

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = getFileType(file);
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}_${i}.${fileExt}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('artist-portfolio')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('artist-portfolio')
          .getPublicUrl(fileName);

        // Save to artist_media table
        const { data: mediaData, error: mediaError } = await supabase
          .from('artist_media')
          .insert({
            artist_id: artistId,
            file_path: fileName,
            file_type: fileType,
            file_url: publicUrl,
            display_order: uploadedFiles.length + i
          })
          .select()
          .single();

        if (mediaError) throw mediaError;

        newFiles.push({
          id: mediaData.id,
          file_path: mediaData.file_path,
          file_type: mediaData.file_type as 'image' | 'video' | 'audio',
          file_url: mediaData.file_url,
          preview: fileType === 'image' ? publicUrl : undefined
        });
      }

      const allFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(allFiles);
      onFilesUploaded(allFiles);
      toast.success(`${newFiles.length} file(s) uploaded successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage.from('artist-portfolio').remove([filePath]);

      // Delete from database
      await supabase.from('artist_media').delete().eq('id', fileId);

      const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
      setUploadedFiles(updatedFiles);
      onFilesUploaded(updatedFiles);
      toast.success('File removed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove file');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <input
          type="file"
          id="portfolio-upload"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <label htmlFor="portfolio-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to upload images, videos, or audio files
          </p>
          <Button type="button" variant="outline" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="relative group">
              <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                {file.file_type === 'image' && file.preview ? (
                  <img src={file.preview} alt="Portfolio" className="w-full h-full object-cover" />
                ) : file.file_type === 'video' ? (
                  <Video className="w-12 h-12 text-muted-foreground" />
                ) : (
                  <Music className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveFile(file.id, file.file_path)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioUploader;
