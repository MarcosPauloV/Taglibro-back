import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { BranchUserService } from "./branch-user.service";
import { CreateBranchUserDto } from "./dto/create-branch-user.dto";

@Controller("branch-user")
export class BranchUserController {
  constructor(private readonly branchUserService: BranchUserService) {}

  @Post()
  create(@Body() createBranchUserDto: CreateBranchUserDto) {
    return this.branchUserService.create(createBranchUserDto);
  }

  @Get(":branchId")
  findAll(@Query("branchId") branchId: string) {
    return this.branchUserService.findAll(branchId);
  }

  @Get("/find")
  findOne(@Query("userId") userId: string, @Query("branchId") branchId: string) {
    return this.branchUserService.findOne(userId, branchId);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateBranchUserDto: UpdateBranchUserDto) {
  //   return this.branchUserService.update(+id, updateBranchUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.branchUserService.remove(+id);
  // }
}
