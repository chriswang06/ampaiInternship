// import { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/Link';
import {useRouter} from 'next/router';
import { Button } from '@mantine/core';

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const {_id} = context.query;

   try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Adjust the default URL as needed
        const response = await fetch(`${baseURL}/api/vendors?search=${encodeURIComponent(_id as string)}`);
        const data = await response.json();
      return {
        props: {data},
      }
  } catch (err: any) {
      console.error('Error fetching vendors:', err);
      return {
        props: {data:null, error : "faled to fetch vendor data"},
      };
  } 
}

export default function vendorPage({data}: {data : any}){
    if (!data){
        return <div>Error loading vendor data.</div>;
    }
    const router = useRouter();
    const goBack = ()=>{
        router.push('/vendors');
    }
    return (
        <div>
            <Button fullWidth onClick ={goBack}>click here to return to vendor search</Button>
            <h1>Vendor Details</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}