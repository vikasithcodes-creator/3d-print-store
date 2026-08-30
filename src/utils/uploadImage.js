export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'SM_Preset');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/cbm2yeec/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.error?.message || data?.message || res.statusText;
      throw new Error('Cloudinary: ' + msg + ' (HTTP ' + res.status + ')');
    }
    if (!data.secure_url) throw new Error('Cloudinary response missing secure_url');
    return data.secure_url;
  } catch (err) {
    if (err.message && err.message.includes('Cloudinary')) throw err;
    throw new Error('Upload failed: ' + err.message);
  }
}
