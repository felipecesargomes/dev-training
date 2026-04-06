import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '../entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tags.entity';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        });
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({ where: { id: id }, relations: ['tags'] });
        if (!course) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        return course;
    }

    async create(createCourseDto: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadTagByName(name))
        );
        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
        });
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDTO) {
        const { tags: tagNames, ...courseData } = updateCourseDto;

        const tags = tagNames
            ? await Promise.all(tagNames.map(name => this.preloadTagByName(name)))
            : undefined;

        const course = await this.courseRepository.preload({
            ...courseData,
            ...(tags ? { tags } : {}),
            id: id
        })
        if(!course) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        return this.courseRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({ where: { id: id } });
        if(!course) {
            throw new NotFoundException(`Course #${id} not found`);
        }
        return this.courseRepository.remove(course);
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ where: { name } });
        if(tag) {
            return tag;
        }
        return this.tagRepository.create({ name });
    }
}