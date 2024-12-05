import { Card, Image, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import {useState} from 'react';
import Link from 'next/link';
interface Description {
  text: string;
  source: string;
}
interface VendorCardProps {
  _id: string;
  status: string;
  action: string;
  vendor_name: string;
  country: string;
  url: string;
  logo_clearbit: string;
  description: Description;

}


export default function VendorCard({ _id, status, action, vendor_name, country, url, logo_clearbit, description }: VendorCardProps) {
  
  const [isClicked, setIsClicked]= useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={logo_clearbit}
          height={160}
          w="auto"
          fit="contain"
          alt="Logo"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" background-color="blue">
        <Text fw={500}>{vendor_name}</Text>
        <Text size="sm">ID: {_id}</Text>
        <Badge color="pink">Status: {status}</Badge>
      </Group>

   
      <ActionIcon variant="default" aria-label="expand" onClick={()=>setIsClicked(!isClicked)}>
        {isClicked ? (
          <IconCaretUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
        ) : (
          <IconCaretDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}     
      </ActionIcon>
      <Text size="sm" c="dimmed">
        {isClicked ? (
        description?.text
        ) : (
          'Click for a Description'
        )}
      </Text>
      <Text size="sm" c="dimmed">
        {isClicked ? `Description source: ${description?.source}` : ""}
      </Text>
      <Link href={`/id/${_id}`}>
        {isClicked ?'Click Here to View Detailed Information about this Vendor' : '' }
      
      </Link>

    </Card>
  );
}