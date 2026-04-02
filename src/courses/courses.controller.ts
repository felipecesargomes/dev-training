import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {

    }

    @Get('list')
    findAll(@Res() response) {
        return response.status(200).json({ message: 'Listagem de cursos' })
    }

    @Get('list/:id/:name')
    findOne(@Param('id') id: string, @Param('name') name: string) {
        return `Curso ${id} - Nome ${name}`;
    }

    @HttpCode(204)
    @Post()
    create(@Body() body) {
        return body;
    }

    @HttpCode(204)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        console.log(body);
        return `Update course with ID ${id}`;
    }

    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Delete course with ID ${id}`;
    }

}