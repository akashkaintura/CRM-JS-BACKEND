import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesResolver } from './leaves.resolver';

@Module({
  providers: [LeavesService, LeavesResolver],
})
export class LeavesModule {}
