import { AppTypeEnum } from '@fastgpt/global/core/app/constants';
import { createSchemaWithComment, Schema, getMongoModel, withComments } from '../../common/mongo';
import type { AppSchema as AppType } from '@fastgpt/global/core/app/type.d';
import {
  TeamCollectionName,
  TeamMemberCollectionName
} from '@fastgpt/global/support/user/team/constant';

export const AppCollectionName = 'apps';

export const chatConfigType = {
  welcomeText: String,
  variables: Array,
  questionGuide: Object,
  ttsConfig: Object,
  whisperConfig: Object,
  scheduledTriggerConfig: Object,
  chatInputGuide: Object,
  fileSelectConfig: Object,
  instruction: String,
  autoExecute: Object
};

// schema

const AppSchema = createSchemaWithComment(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: AppCollectionName,
      default: null,
      comment: '父应用ID，用于应用继承关系'
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: TeamCollectionName,
      required: true,
      comment: '所属团队ID，必填字段'
    },
    tmbId: {
      type: Schema.Types.ObjectId,
      ref: TeamMemberCollectionName,
      required: true,
      comment: '团队成员ID，标识创建者'
    },
    name: {
      type: String,
      required: true,
      comment: '应用名称'
    },
    type: {
      type: String,
      default: AppTypeEnum.workflow,
      enum: Object.values(AppTypeEnum),
      comment: '应用类型，如工作流、插件等'
    },
    version: {
      type: String,
      enum: ['v1', 'v2'],
      comment: '应用版本号'
    },
    avatar: {
      type: String,
      default: '/icon/logo.svg',
      comment: '应用头像'
    },
    intro: {
      type: String,
      default: '',
      comment: '应用介绍'
    },

    updateTime: {
      type: Date,
      default: () => new Date(),
      comment: '更新时间'
    },

    // role and auth
    teamTags: {
      type: [String],
      comment: '团队标签'
    },

    // save app(Not publish)
    modules: {
      type: Array,
      default: [],
      comment: '应用模块配置'
    },
    edges: {
      type: Array,
      default: [],
      comment: '模块连接关系'
    },
    chatConfig: {
      type: chatConfigType,
      comment: '聊天配置'
    },
    // plugin config
    pluginData: {
      type: {
        nodeVersion: String,
        pluginUniId: String,
        apiSchemaStr: String, // http plugin
        customHeaders: String // http plugin
      },
      comment: '插件数据配置'
    },

    scheduledTriggerConfig: {
      type: {
        cronString: {
          type: String
        },
        timezone: {
          type: String
        },
        defaultPrompt: {
          type: String
        }
      },
      comment: '定时触发配置'
    },
    scheduledTriggerNextTime: {
      type: Date,
      comment: '下次定时触发时间'
    },

    inited: {
      type: Boolean,
      comment: '是否已初始化'
    },
    inheritPermission: {
      type: Boolean,
      default: true,
      comment: '是否继承权限'
    },

    // abandoned
    defaultPermission: {
      type: Number,
      comment: '默认权限（已废弃）'
    }
  },
  {
    comment: 'App schema for managing applications within a team'
  }
);
AppSchema.index({ type: 1 });
AppSchema.index({ teamId: 1, updateTime: -1 });
AppSchema.index({ teamId: 1, type: 1 });
AppSchema.index(
  { scheduledTriggerConfig: 1, scheduledTriggerNextTime: -1 },
  {
    partialFilterExpression: {
      scheduledTriggerConfig: { $exists: true }
    }
  }
);

export const MongoApp = getMongoModel<AppType>(AppCollectionName, AppSchema);

// 导出带comment功能的模型，推荐在需要访问comment的地方使用
export const MongoAppWithComments = withComments(MongoApp);
