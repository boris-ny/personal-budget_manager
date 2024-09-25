import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formSchema } from '@/lib/types';
import { z } from 'zod';

type ItemData = z.infer<typeof formSchema>;

export default function ItemTable() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemData[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(storedItems);
    setFilteredItems(storedItems);
  }, []);

  useEffect(() => {
    let result = items;

    if (categoryFilter !== 'all') {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (dateFilter) {
      result = result.filter((item) => item.date === dateFilter);
    }

    setFilteredItems(result);
  }, [items, categoryFilter, dateFilter]);

  const uniqueDates = Array.from(
    new Set(items.map((item) => item.date))
  ).sort();

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="space-y-2">
          <Label htmlFor="category-filter">Filter by Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter" className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date-filter">Filter by Date</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger id="date-filter" className="w-[180px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">All Dates</SelectItem>
              {uniqueDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.amount}</TableCell>
              <TableCell>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
