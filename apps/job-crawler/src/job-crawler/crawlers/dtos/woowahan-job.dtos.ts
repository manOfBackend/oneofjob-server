// recruitStatusCode 필드를 위한 인터페이스
export interface RecruitStatusCodeDto {
  code: string;
  text: string;
}

// careerType, jobGroup, employmentType, typicalClassification, keywords 배열 요소 등
// 공통 구조를 위한 인터페이스
export interface RecruitItemDto {
  recruitItemGroupCode: string;
  recruitItemCode: string;
  primary: boolean;
}

// 'list' 배열의 각 항목(채용 공고 정보)을 위한 인터페이스
export interface RecruitInfoDto {
  recruitSeq: number;
  recruitNumber: string;
  recruitVersion: number;
  recruitCorporationNumber: string;
  recruitHiddenUrl: string;
  pluarApplicationCount: number;
  recruitmentCount: number;
  recruitOpenDate: string; // 실제 사용 시 Date 타입으로 변환 고려
  recruitEndDate: string; // 실제 사용 시 Date 타입으로 변환 고려
  recruitCloseDate: string; // 실제 사용 시 Date 타입으로 변환 고려
  careerRestrictionMinYears: number;
  careerRestrictionMaxYears: number;
  applicationMobileYn: boolean;
  recruitName: string;
  recruitmentRequestOrganizationSeq: number;
  recruitmentRequestOrganizationId: string;
  recruitmentRequestOrganizationName: string;
  recruitmentRequestOrganizations: any | null; // 실제 타입 모르면 any 또는 unknown
  recruitmentRequestUser: number;
  recruitStatusCode: RecruitStatusCodeDto; // 중첩 인터페이스
  recruitDisplayCode: string;
  recruitCampaignSeq: number;
  recruitDeleteYn: boolean;
  createUser: number;
  createDate: string; // 실제 사용 시 Date 타입으로 변환 고려
  updateUser: number;
  updateDate: string; // 실제 사용 시 Date 타입으로 변환 고려
  recruitContents: any | null;
  careerType: RecruitItemDto; // 중첩 인터페이스
  jobGroup: RecruitItemDto; // 중첩 인터페이스
  employmentType: RecruitItemDto; // 중첩 인터페이스
  typicalClassification: RecruitItemDto; // 중첩 인터페이스
  jobs: any | null;
  serviceSections: any | null;
  keywords: RecruitItemDto[]; // RecruitItemDto 객체의 배열
  jobClassifications: any | null;
  resumeEntryGroups: any | null;
  supplyButtonDisplayYn: boolean;
  displayTopYn: boolean;
  managers: any | null;
  pluarApplications: any | null;
  permanentConversionYn: boolean;
  specialRecruitmentYn: boolean;
  directorRecruitmentYn: boolean;
  selfIntroduceDisabledYn: boolean;
  selfIntroduces: any | null;
  judgmentProcedures: any | null;
  recruitCampaignRequests: any | null;
  qualificationRestriction: any | null;
  isUnlimitedEndDate: boolean;
  isHidden: boolean;
  isAfterOrEqualEndDay: boolean;
  isPublicTypical: boolean;
  isAfterOrEqualOpenDay: boolean;
  isTemporaryStatus: boolean;
  representativeRecruitmentRequestOrganization: number;
}

// 'data' 객체 내부 구조를 위한 인터페이스
export interface RecruitDataDto {
  pageSize: number;
  pageNumber: number;
  totalPageNumber: number;
  totalSize: number;
  list: RecruitInfoDto[]; // RecruitInfoDto 객체의 배열
}

// 최상위 API 응답 구조를 위한 인터페이스 (Root DTO)
export interface ApiResponseDto {
  code: string;
  message: string;
  data: RecruitDataDto; // 중첩 인터페이스
}
