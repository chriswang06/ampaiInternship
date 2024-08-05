import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
interface VendorCardProps{
  _id: string;
  status: string;
  action: string;
  vendor_name: string;
  country: string;
  url: string;
  logo_clearbit: string;
  description : string;
}
export default function VendorCard({_id, status, action, vendor_name, country, url, logo_clearbit, description}:VendorCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={logo_clearbit}
          height={160}
          width ={160}
          alt="Logo"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{vendor_name}</Text>
        <Badge color="pink">Status: {status}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}