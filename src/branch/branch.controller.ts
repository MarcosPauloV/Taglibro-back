import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { InstitutionGuard } from "src/auth/guards/institution.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CurrentToken } from "src/auth/jwt.decorator";
import { JwtPayload } from "src/auth/entities/jwt-token";

@Controller("branch")
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  @UseGuards(InstitutionGuard)
  @Post()
  create(@Body() createBranchDto: CreateBranchDto, @CurrentToken() jwtPayload: JwtPayload) {
    return this.branchService.create(createBranchDto, jwtPayload.accountId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchService.findOne(id);
  }

  @UseGuards(InstitutionGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(id, updateBranchDto);
  }

  @UseGuards(InstitutionGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.branchService.remove(id);
  }
}
