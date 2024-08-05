import clientPromise from "../lib/data";
import { GetServerSideProps } from 'next';


interface Customer {
   _id: string;
   company_name: string;
   industry: string;
}


interface CustomerProps {
   customers: Customer[];
}


const Customers: React.FC<CustomerProps> = ({ customers }) => {
   return (
       <div>
           
           <ul>
               {customers.map((customer) => (
                   <li key={customer._id}>
                       <h2>Company Name: {customer.company_name}</h2>
                       <h2>ID: {customer._id}</h2>
                        <h3>Industry: {customer.industry}</h3>
                       
                   </li>
               ))}
           </ul>
       </div>
   );
};


export default Customers;


export const getServerSideProps: GetServerSideProps = async () => {
   try {
       const client = await clientPromise;
       const db = client.db("ampai");
       const customers = await db
           .collection("customers")
           .find({})
           .sort({})
           .limit(20)
           .toArray();
       return {
           props: { customers: JSON.parse(JSON.stringify(customers)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { customers: [] } };
   }
};