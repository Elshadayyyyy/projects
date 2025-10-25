import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const VerifySupplier = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [tradeLicenceFile, setTradeLicenceFile] = useState(currentUser?.tradeLicenceFile || null);
  const [description, setDescription] = useState(currentUser?.businessDescription || '');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim() || !tradeLicenceFile || !description.trim()) {
      alert('Please fill all fields and upload a trade licence file');
      return;
    }
    setSubmitting(true);

    const updates = {
      phone,
      tradeLicenceFile,
      businessDescription: description,
      verificationRequested: true,
      verificationStatus: 'pending'
    };

    updateProfile(updates);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 2200);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Verify as Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Trade licence (upload PDF or image)</label>
          <input type="file" accept="image/*,application/pdf" onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
              setTradeLicenceFile({ name: f.name, type: f.type, dataUrl: ev.target.result });
            };
            reader.readAsDataURL(f);
          }} className="w-full px-3 py-2" />
          {tradeLicenceFile && (
            <div className="mt-2 text-sm text-gray-700">Uploaded: {tradeLicenceFile.name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded" rows={4} required />
        </div>

        <div className="flex items-center space-x-3">
          <button type="submit" disabled={submitting} className="bg-black text-white px-4 py-2 rounded">{submitting ? 'Submitting...' : 'Submit verification'}</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>

      {showToast && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 bg-black text-white px-4 py-2 rounded shadow">
          We will get back to you when the admin finishes verifying.
        </div>
      )}
    </div>
  );
};

export default VerifySupplier;
