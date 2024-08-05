import { Button, TextInput } from '@mantine/core';
import { useState , useEffect} from 'react';
import clientPromise from "../lib/data";
import { GetServerSideProps } from 'next';
import { SourceTextModule } from 'vm';
import VendorCard from '../components/VendorCard';

// export default function Home() {
interface Vendor {
    _id: string;
    status: string;
    action: string;
    vendor_name: string;
    country: string;
    url: string;
    logo_clearbit: string;
    description : string;
}


interface VendorProps {
    vendors: Vendor[];
}


const Vendor: React.FC<VendorProps> = ({ vendors }) => {
    const [search, setSearch] = useState('');
    const [value, setValue] = useState('');
    const result = sort(vendors, search);
    return (
        <div>
            <h1>
                <TextInput
                    label="Vendor Name"
                    placeholder="type name"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Button variant="filled" onClick={(event) => {
                    setSearch(value);
     
                }}>Button</Button>


            </h1>
            {/* {getResult(result)} */}
            {/* <ul>
                {(result || []).map((vendor) => (
                    <li key={vendor._id}>
                        <h2>Company Name: {vendor.vendor_name}</h2>
                        <h2>ID: {vendor._id}</h2>
                    </li>
                ))}
            </ul> */}
            {(result || []).map((vendor)=>(
                <VendorCard {...vendor}/>
            ))}
        </div>
    );
};
export default Vendor;

 function sort(Vendors:Vendor[],param:string){
    return (Vendors || []).filter((vendor) => vendor.vendor_name.includes(param))
}
/* 
    // const { props: { vendors } } = await getServerSideProps();

const Vendors = ({ vendors }: { vendors: Vendor[]} ) => {
  
  // const [Vendor, setVendor] = useState([]);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  // const vendors = [{ _id: "id", vendor_name: "hello"}];
  const result = (vendors as Vendor[]).filter((vendor) => vendor.vendor_name.includes(search));
  return (
      <div>
          <h1>
              <TextInput
                  label="Vendor Name"
                  placeholder="type name"
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
              />
              <Button variant="filled" onClick={() => setSearch(value)}>Button</Button>
          </h1>
          <ul>
              {(result || []).map((vendor) => (
                  <li key={vendor._id}>
                      <h2>Vendor Name: {vendor.vendor_name}</h2>
                      <h2>ID: {vendor._id}</h2>
                  </li>
              ))}
          </ul>
      </div>
  );
// };
return <Vendors vendors={vendors as Vendor[]} />;

*/
export const getStaticProps: GetServerSideProps = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("ampai");
        const vendors = await db
            .collection("vendors")
            .find({})
            .limit(1000)
            .toArray();
        return {
            props: { vendors: await JSON.parse(JSON.stringify(vendors)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { vendors: [] } };
    }
};

// export function SearchBar() {
//     const [value, setValue] = useState('');
//     return (
//       <TextInput
//       label="Vendor Name"
//       placeholder="type name"
//       value = {value}
//       onChange = {(event) => setValue(event.currentTarget.value)}
//             />
//     );
// // }
// function SearchButton(){
//     return <Button variant="filled" onClick ={()=>setSearch(search) }>Button</Button>;
// }
// }