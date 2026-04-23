---
tags: [entity, db_schema]
---
# FACTORY

## ?뱰 媛쒖슂
FactoryAI ?뚮옯?쇱쓣 ?꾩엯??怨좉컼??怨듭옣)??理쒖긽???⑥쐞 媛앹껜?낅땲?? 紐⑤뱺 ?먯썝(?쇱씤, ERP ?곌껐, 援щ룆 ?????뚯쑀 二쇱껜?낅땲??

## ?뾼截??ㅽ궎留?(Schema)
| ?꾨뱶紐?| ???| ?쒖빟 | ?ㅻ챸 |
|:---|:---|:---|:---|
| id | UUID | PK | 怨듭옣 怨좎쑀 ?앸퀎??|
| name | VARCHAR(255) | NOT NULL | 怨듭옣紐?|
| industry | ENUM | NOT NULL | ?낆쥌 (METAL_PROCESSING, FOOD_MANUFACTURING) |
| address | TEXT | NOT NULL | 二쇱냼 |
| employee_count | INT | NOT NULL | 醫낆뾽????|
| created_at | TIMESTAMP | NOT NULL | ?깅줉?쇱떆 |

## ?뵕 ?곌? 愿怨?- ?뚯쑀: [[PRODUCTION_LINE]], [[ERP_CONNECTION]], [[ONBOARDING_PROJECT]], [[VOUCHER_PROJECT]], [[SECURITY_REVIEW]], [[SUBSCRIPTION]], [[DATA_SOURCE]], [[USER]]

## ?뱴 異쒖쿂 臾명뿄
- [[18_SRS_V07]]
