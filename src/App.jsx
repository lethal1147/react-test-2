import "./App.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import InputWithLabel from "./components/common/inputWithLabel";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT = {
  name: "",
  total: 0,
  isPaid: false,
};

const DEFAULT_LIST = [
  {
    name: "ค่าน้ำ",
    total: 400,
    isPaid: false,
  },
  {
    name: "ค่าไฟ ทดสอบ",
    total: 2500,
    isPaid: false,
  },
  {
    name: "ค่าคอนโด",
    total: 7000,
    isPaid: false,
  },
  {
    name: "ค่าเน็ต",
    total: 500,
    isPaid: false,
  },
];

function App() {
  const [selectedForm, setSelectedForm] = useState(DEFAULT);
  const [list, setList] = useState(DEFAULT_LIST);
  const [validateError, setValidateError] = useState({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(DEFAULT_LIST);

  const validateForm = () => {
    const newErr = {};

    if (!selectedForm.name) newErr.name = true;
    if (!selectedForm.total) newErr.total = true;
    setValidateError(newErr);
    return Object.keys(newErr).length === 0;
  };

  const onChangeValue = (e) => {
    const { value, name } = e.target;
    setSelectedForm((prev) => ({ ...prev, [name]: value }));
  };

  const onDelete = (idx) => {
    const filtered = list.filter((_, i) => i !== idx);
    setList(filtered);
  };

  const onSave = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    const updated = [...list];
    updated.push(selectedForm);
    setList(updated);
    setSelectedForm(DEFAULT);
  };

  const onApprove = (idx) => {
    const updated = [...list];
    updated[idx].isPaid = !updated[idx].isPaid;
    setList(updated);
  };

  const onSelectFilter = (val) => {
    setSearch(val);
  };

  useEffect(() => {
    if (search) {
      const isPaid = search === "paid";
      const updated = list.filter((l) => l.isPaid === isPaid);
      setFiltered(updated);
    } else {
      setFiltered(list);
    }
  }, [search, list]);

  return (
    <div className="w-screen h-screen bg-gray-900 !text-white">
      <nav className="w-full bg-yellow-600 p-5 flex items-center justify-between">
        <h1 className="font-bold text-white text-3xl">Bill management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add +</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={onSave} className="flex flex-col gap-2">
              <DialogTitle className="text-xl ">Bill</DialogTitle>
              <div className="flex flex-col gap-2 my-5">
                <InputWithLabel
                  label="Name"
                  onChange={onChangeValue}
                  value={selectedForm.name}
                  name="name"
                  error={validateError.name}
                />
                <InputWithLabel
                  label="Total"
                  onChange={onChangeValue}
                  value={selectedForm.total}
                  name="total"
                  type="number"
                  error={validateError.total}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </nav>

      <div className="w-full px-20 py-5">
        <p>Status</p>
        <div className="w-80">
          <Select onValueChange={onSelectFilter} value={search}>
            <SelectTrigger>
              <SelectValue placeholder="Status"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="wait">Wait</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mx-20 my-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white w-full">Name</TableHead>
              <TableHead className="text-white min-w-[250px]">Total</TableHead>
              <TableHead className="text-white min-w-[250px]">Status</TableHead>
              <TableHead className="text-white min-w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((bill, index) => (
              <TableRow onClick={() => onApprove(index)} key={index}>
                <TableCell className="font-medium">{bill.name}</TableCell>
                <TableCell>{bill.total}</TableCell>
                <TableCell>
                  <Badge>{bill.isPaid ? "Paid" : "Wait"}</Badge>
                </TableCell>
                <TableCell>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="size-10 rounded-full hover:bg-red-600 transition cursor-pointer bg-red-500 flex justify-center items-center"
                  >
                    <p>X</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
