import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { UserCourseService } from "./user-course.service";
import { CreateUserCourseDto } from "./dto/create-user-course.dto";
import { UpdateUserCourseDto } from "./dto/update-user-course.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("user-course")
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post()
  create(@Body() createUserCourseDto: CreateUserCourseDto) {
    return this.userCourseService.create(createUserCourseDto);
  }

  @Get(":courseId")
  findAll(@Param("courseId") courseId: string) {
    return this.userCourseService.findAll(courseId);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.userCourseService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserCourseDto: UpdateUserCourseDto) {
  //   return this.userCourseService.update(+id, updateUserCourseDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userCourseService.remove(+id);
  // }
}