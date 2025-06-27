import Lesson from "./lesson";

type Module = {
  _id: string;
  title: string;
  lessons: Lesson[];
  description: string;
  order: number;
  completedLessons: number;
};

export default Module;
