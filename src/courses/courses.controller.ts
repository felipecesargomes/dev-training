import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get('list')
    findAll() {
        return 'Listagem de cursos';
    }

    @Get('list/:id')
    findOne(@Param('id') id: string) {
        return `Curso ${id}`;
    }

}