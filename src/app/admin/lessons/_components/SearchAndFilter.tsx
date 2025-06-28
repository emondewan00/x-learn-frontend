import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Search } from "lucide-react";
import React from "react";

type Course = {
  _id: string;
  title: string;
};

type Props = {
  courses: Course[];
  modules: Course[];
  onChangeCourse: (value: string) => void;
  onChangeModule: (value: string) => void;
  selectedCourse: string;
  selectedModule: string;
  handleSearch: (value: string) => void;
  searchTerm: string;
};

const SearchAndFilter: React.FC<Props> = ({
  courses,
  modules,
  onChangeCourse,
  onChangeModule,
  selectedCourse,
  selectedModule,
  handleSearch,
  searchTerm,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters & Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lectures..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCourse} onValueChange={onChangeCourse}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-auto">
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course._id} value={course._id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedModule} onValueChange={onChangeModule}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Module" />
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-auto">
              <SelectItem value="all">All Modules</SelectItem>
              {modules.map((module) => (
                <SelectItem key={module._id} value={module._id}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchAndFilter;
