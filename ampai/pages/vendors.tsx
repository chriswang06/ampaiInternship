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
  const [search, setSearch] = useState(''); // State for search input value
  const [vendors, setVendors] = useState<Vendor[]>([]); // State for the fetched vendor data
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const handleSearch = async () => {
    setLoading(true); // Show loading state
    setError(null); // Reset error state
    try {
        const response = await fetch(`/api/vendors?search=${encodeURIComponent(search)}`);
        //   if (!response.ok) {
    //     throw new Error('Failed to fetch vendors');
    //   }
      const data = await response.json();
      setVendors(data.vendors || []); // Update vendors state
    } catch (err: any) {
      console.error('Error fetching vendors:', err);
      setError('Failed to fetch vendors. Please try again.'); // Set error state
    } finally {
      setLoading(false); // Hide loading state
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

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}

      {vendors.length > 0 ? (
        vendors.map((vendor) => (
          <VendorCard key={vendor._id} {...vendor} />
        ))
      ) : (
        !loading && <p>No vendors found.</p> // Show "No vendors found" only when not loading
      )}
    </div>
  );
};

export default Vendor;
