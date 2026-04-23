---
tags: [entity, db_schema]
---
# SUBSCRIPTION

## ?뱰 媛쒖슂
[[CFO]]媛 媛??二쇰ぉ?섎뒗 ?щТ 吏?? 怨좉컼?ъ쓽 ?붽툑???뚮옖, ?붽컙 諛섎났 留ㅼ텧(MRR), 洹몃━怨??꾩엯 ??'?꾩쟻 ?덇컧????湲곕줉?섏뿬 怨꾩빟 媛깆떊??洹쇨굅瑜??쒓났?⑸땲??

## ?뾼截??ㅽ궎留?(Schema)
| ?꾨뱶紐?| ???| ?쒖빟 | ?ㅻ챸 |
|:---|:---|:---|:---|
| id | UUID | PK | 援щ룆 ?앸퀎??|
| factory_id | UUID | FK ??FACTORY | ???怨듭옣 |
| plan_type | ENUM | NOT NULL | ?뚮옖 (POC_TRIAL, VOUCHER_BUNDLED, SELF_PAY_MRR) |
| start_date | DATE | NOT NULL | ?쒖옉??|
| end_date | DATE | ??| 醫낅즺??|
| mrr_amount | DECIMAL(15,2) | NOT NULL | ??MRR 湲덉븸 |
| status | ENUM | NOT NULL | ?곹깭 (TRIAL, ACTIVE, RENEWAL_PENDING, CHURNED, RENEWED) |
| cumulative_savings | JSON | ??| E7 ??쒕낫???꾩쟻 ?덇컧??|
| savings_vs_mrr_ratio | DECIMAL(5,2) | ??| ?덇컧???鍮?MRR 鍮꾩쑉 |
| renewal_proposal_date | DATE | ??| 媛깆떊 ?쒖븞??|
| renewal_result | ENUM | ??| 媛깆떊 寃곌낵 (PENDING, RENEWED, CHURNED) |
| churn_reason | VARCHAR(500) | ??| ?댄깉 ?ъ쑀 |

## ?뵕 ?곌? 愿怨?- ?뚯냽: [[FACTORY]]
- 鍮꾩슜 吏?? [[VOUCHER_PROJECT]]

## ?뱴 異쒖쿂 臾명뿄
- [[18_SRS_V07]]
