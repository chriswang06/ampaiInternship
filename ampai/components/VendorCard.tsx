import { Card, Image, Text, Badge, Button, Group, ActionIcon } from '@mantine/core';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import {useState} from 'react';
interface description {
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
  description: description;

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
        <Badge color="pink">Status: {status}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {
        }   
        Description
      </Text>
      <ActionIcon variant="default" aria-label="expand" onClick={()=>setIsClicked(!isClicked)}>
        {isClicked ? (
          <IconCaretDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
        ) : (
          <IconCaretUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}     
      </ActionIcon>
    </Card>
  );
}