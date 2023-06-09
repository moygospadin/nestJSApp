import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async addTag(tagNames: string[]) {
    const tags = (await this.tagRepository.find()).map((tag) => tag.name);

    const newTagNames = this.findUniqueTagNames(tagNames, tags);

    for (let i = 0; i < newTagNames.length; i++) {
      const newTag = new TagEntity();
      newTag.name = newTagNames[i];
      await this.tagRepository.save(newTag);
    }
  }

  private findUniqueTagNames(arr1: string[], arr2: string[]) {
    const uniqueStrings = {};
    const result = [];

    arr2.forEach((str) => {
      uniqueStrings[str] = true;
    });

    arr1.forEach((str) => {
      if (!uniqueStrings[str]) {
        result.push(str);
        uniqueStrings[str] = true;
      }
    });

    return result;
  }
}
