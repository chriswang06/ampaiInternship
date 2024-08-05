import { Button, TextInput } from '@mantine/core';
import { useState , useEffect} from 'react';
import clientPromise from "../lib/data";
import { GetServerSideProps } from 'next';
import { SourceTextModule } from 'vm';

// export default function Home() {
interface Vendor {
    _id: string;
    vendor_name: string;
}


interface VendorProps {
    vendors: Vendor[];
}


const Vendor: React.FC<VendorProps> = ({ vendors }) => {
    const [search, setSearch] = useState('');
    const [value, setValue] = useState('');
    // const result = vendors.filter((vendor)=>vendor.vendor_name.includes(search));
    // const result = vendors?.filter((vendor) => vendor.vendor_name.includes(search))
    const result = sort(vendors, search);
    // const result = useEffect(()=>sort(vendors,search),[vendors,search]);
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
                    console.log(value);
                    console.log(search);
                    console.log(result);
                }}>Button</Button>


            </h1>
            {/* {getResult(result)} */}
            <ul>
                {(result || []).map((vendor) => (
                    <li key={vendor._id}>
                        <h2>Company Name: {vendor.vendor_name}</h2>
                        <h2>ID: {vendor._id}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Vendor;

 function sort(Vendors:Vendor[],param:string){
    console.log(Vendors);
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