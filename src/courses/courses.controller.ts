import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

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

    @HttpCode(204)
    @Post()
    create(@Body() body) {
        return this.coursesService.create(body);
    }

    @HttpCode(204)
    @Put(':id')
    update(@Param('id') id: number, @Body() body) {
        return this.coursesService.update(id, body);
    }

    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.coursesService.remove(id);
    }

}