import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import VendorCard from '../components/VendorCard';

interface Description {
  text: string;
  source: string;
}

interface Vendor {
  _id: string;
  status: string;
  action: string;
  vendor_name: string;
  country: string;
  url: string;
  logo_clearbit: string;
  description: Description;
}

const Vendor: React.FC = () => {
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true); 
    setError(null); 
    try {
        const response = await fetch(`/api/vendors?search=${encodeURIComponent(search)}`);

      const data = await response.json();
      setVendors(data.vendors || []); 
    } catch (err: any) {
      console.error('Error fetching vendors:', err);
      setError('Failed to fetch vendors. Please try again.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h1>Vendor Search</h1>
      <TextInput
        label="Vendor Name"
        placeholder="Type name"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Button variant="filled" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      {vendors.length > 0 ? (
        vendors.map((vendor) => (
          <VendorCard key={vendor._id} {...vendor} />
        ))
      ) : (
        !loading && <p>No vendors found.</p> 
      )}
    </div>
  );
};

export default Vendor;
