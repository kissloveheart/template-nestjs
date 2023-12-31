import { Column, Entity } from 'typeorm';
import { AuditEntity } from './base/audit-entity';
import { RoleName } from '@/types/enum/role.enum';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Permission } from './permission.entity';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role extends AuditEntity {
	@Column()
	@IsEnum(RoleName)
	@ApiProperty()
	name: RoleName;

	@Column()
	@Type(() => Permission)
	@ValidateNested({ each: true })
	@IsArray()
	@Exclude()
	permission: Permission[] = [];

	constructor(partial: Partial<Role>) {
		super();
		Object.assign(this, partial);
	}
}
