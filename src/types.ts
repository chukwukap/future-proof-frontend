import {  Token } from "@prisma/client";

export type FutureProofUser = {
  id: string;
  email: string;
  baseName: string;
};

export type GoalWithToken = Goal & {
  token: Token;
};

export type GoalStatus = 'on_track' | 'behind' | 'at_risk' | 'completed';
export type GoalCategory = 'real_estate' | 'emergency' | 'education' | 'retirement' | 'travel' | 'business' | 'other';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline: string;
  category: GoalCategory;
  monthlyTarget: number;
  lastContribution: string;
  status: GoalStatus;
  description?: string;
  milestones: Milestone[];
  contributions: Contribution[];
  projectedGrowth: ProjectedGrowth;
  tags: string[];
}

export interface Milestone {
  id: string;
  amount: number;
  achieved: boolean;
  date: string;
  description: string;
}

export interface Contribution {
  id: string;
  amount: number;
  date: string;
  type: 'manual' | 'automatic' | 'interest';
  note?: string;
}

export interface ProjectedGrowth {
  monthlyRate: number;
  projectedCompletion: string;
  scenarios: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
}
