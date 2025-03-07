"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    configService;
    logger = new common_1.Logger(FirebaseService_1.name);
    db;
    constructor(configService) {
        this.configService = configService;
        if (!admin.apps.length) {
            const credentialBase64 = configService.get('FIREBASE_CREDENTIAL_BASE64');
            if (!credentialBase64) {
                this.logger.error('FIREBASE_CREDENTIAL_BASE64 환경변수가 설정되지 않았습니다.');
                return;
            }
            const credentialJson = Buffer.from(credentialBase64, 'base64').toString('utf-8');
            const credential = JSON.parse(credentialJson);
            admin.initializeApp({
                credential: admin.credential.cert(credential),
                databaseURL: configService.get('FIREBASE_DATABASE_URL'),
            });
            this.logger.log('Firebase 초기화 완료');
        }
        this.db = admin.firestore();
    }
    async saveJob(job) {
        const snapshot = await this.db.collection('jobs').where('url', '==', job.url).get();
        if (snapshot.empty) {
            await this.db.collection('jobs').add(job);
            this.logger.log(`새 채용공고 저장: ${job.title}`);
        }
    }
    async saveJobs(jobs) {
        for (const job of jobs) {
            await this.saveJob(job);
        }
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = FirebaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map