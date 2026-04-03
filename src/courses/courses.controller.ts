import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {

    }

    @Get('list')
    findAll() {
        return this.coursesService.findAll();
    }

    @Get('list/:id')
    findOne(@Param('id') id: number) {
        return this.coursesService.findOne(Number(id));
    }

    @HttpCode(201)
    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO) {
        return this.coursesService.create(createCourseDTO);
    }

    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateCourseDTO: UpdateCourseDTO) {
        return this.coursesService.update(id, updateCourseDTO);
    }

    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.coursesService.remove(id);
    }

}