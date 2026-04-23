---
tags: [entity, db_schema]
---
# SECURITY_REVIEW

## ?뱰 媛쒖슂
[[CISO]] 愿臾몄쓣 ?듦낵?섍린 ?꾪븳 留앸텇由??ㅺ퀎, ISMS 寃利?諛?蹂댁븞 ?ъ쓽 吏꾪뻾 ?꾪솴??愿由ы븯???뷀떚?곗엯?덈떎.

## ?뾼截??ㅽ궎留?(Schema)
| ?꾨뱶紐?| ???| ?쒖빟 | ?ㅻ챸 |
|:---|:---|:---|:---|
| id | UUID | PK | 蹂댁븞 ?ъ쓽 ?앸퀎??|
| factory_id | UUID | FK ??FACTORY | ???怨듭옣 |
| document_prepared | DATE | ??| 臾몄꽌 以鍮??꾨즺??|
| review_meeting | DATE | ??| ?ъ쓽 誘명똿??|
| result | ENUM | NOT NULL, DEFAULT 'PENDING' | 寃곌낵 (PENDING, CONDITIONAL, APPROVED, REJECTED) |
| supplement_items | JSON | ??| 蹂댁셿 ?붿껌 ??ぉ |

## ?뵕 ?곌? 愿怨?- ?뚯냽: [[FACTORY]]

## ?뱴 異쒖쿂 臾명뿄
- [[18_SRS_V07]]
