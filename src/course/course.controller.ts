import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { AccessRole, CurrentBranch } from "src/branch-user/branch.decorator";

import { Role } from "src/branch-user/entities/branch-user.entity";
import { UserBranchGuard } from "src/auth/guards/user-branch.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @CurrentBranch() branchId: string) {
    return this.courseService.create(createCourseDto, branchId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@CurrentBranch() branchId: string) {
    return this.courseService.findAll(branchId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @AccessRole(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(id);
  }
}
