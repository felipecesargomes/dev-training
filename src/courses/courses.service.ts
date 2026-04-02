import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'NestJS',
            description: 'Fundamentos do NestJS',
            tags: ['node.js', 'nestjs', 'javascript']
        }
    ]

    findAll() {
        return this.courses;
    }

    findOne(id: number) {
        const course = this.courses.find(course => course.id === id);
        if (!course) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        return course;
    }

    create(createCourseDto: any) {
        this.courses.push(createCourseDto);
        return createCourseDto;
    }

    update(id: number, updateCourseDto: any) {
        const indexCourse = this.courses.findIndex(course => course.id === Number(id));
        if (indexCourse < 0) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        this.courses[indexCourse] = { ...this.courses[indexCourse], ...updateCourseDto };
        return this.courses[indexCourse];
    }

    remove(id: number) {
        const indexCourse = this.courses.findIndex(course => course.id === Number(id));
        if (indexCourse < 0) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        this.courses.splice(indexCourse, 1);
    }
}
