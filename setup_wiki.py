import os
import glob
import re

base_dir = r'E:\Antigavity Workspace\my_RPA_AI_SaaS_workbace'
raw_dir = os.path.join(base_dir, 'raw')
wiki_dir = os.path.join(base_dir, 'wiki')
sources_dir = os.path.join(wiki_dir, 'sources')

categories = ['SRS', 'PRD', 'VPS', 'JTBD', 'Research']
for cat in categories:
    os.makedirs(os.path.join(sources_dir, cat), exist_ok=True)
os.makedirs(os.path.join(wiki_dir, 'concepts'), exist_ok=True)
os.makedirs(os.path.join(wiki_dir, 'entities'), exist_ok=True)

raw_files = glob.glob(os.path.join(raw_dir, '*.md'))

source_links = {cat: [] for cat in categories}

for filepath in raw_files:
    filename = os.path.basename(filepath)
    name_no_ext = os.path.splitext(filename)[0]
    
    # Categorize
    cat = 'Research'
    if 'SRS' in filename:
        cat = 'SRS'
    elif 'PRD' in filename or 'RPD' in filename:
        cat = 'PRD'
    elif 'VPS' in filename or 'Value_Proposition' in filename:
        cat = 'VPS'
    elif 'JTBD' in filename or 'CJM' in filename or '페르소나' in filename or 'Persona' in filename:
        cat = 'JTBD'
    
    # Create stub
    stub_path = os.path.join(sources_dir, cat, f"{name_no_ext}.md")
    with open(stub_path, 'w', encoding='utf-8') as f:
        f.write(f"---\n")
        f.write(f"tags: [source, {cat}]\n")
        f.write(f"status: pending_summary\n")
        f.write(f"---\n\n")
        f.write(f"# {name_no_ext}\n\n")
        f.write(f"**원본 소스**: aw/{filename}\n\n")
        f.write(f"> 이 문서는 LLM 위키 수집(Ingest) 대기 중인 소스입니다. 내용 요약과 개념/엔티티 추출이 필요합니다.\n")
        
    source_links[cat].append(name_no_ext)

# Write index.md
index_path = os.path.join(wiki_dir, 'index.md')
with open(index_path, 'w', encoding='utf-8') as f:
    f.write("# FactoryAI Knowledge Base Index\n\n")
    f.write("이 카탈로그는 FactoryAI 프로젝트의 모든 위키 페이지를 분류합니다.\n\n")
    
    f.write("## 🏛️ Entities (엔티티)\n")
    f.write("- [[FactoryAI]] (Core Product)\n")
    f.write("- [[COO]] (Persona)\n")
    f.write("- [[CISO]] (Persona)\n")
    f.write("- [[CFO]] (Persona)\n")
    f.write("- [[품질이사]] (Persona)\n")
    f.write("- [[구매본부장]] (Persona)\n")
    f.write("- [[CIO]] (Persona)\n\n")
    
    f.write("## 💡 Concepts (개념)\n")
    f.write("- [[2차 자동화 공백 (Second Automation Gap)]]\n")
    f.write("- [[Zero-Touch 패시브 로깅 (STT+Vision)]]\n")
    f.write("- [[HITL (Human-in-the-Loop)]]\n")
    f.write("- [[비파괴형 ERP 브릿지]]\n")
    f.write("- [[100% 온프레미스 AI 패키지]]\n\n")
    
    f.write("## 📚 Sources (소스)\n\n")
    for cat in categories:
        f.write(f"### {cat}\n")
        for link in sorted(source_links[cat]):
            f.write(f"- [[{link}]]\n")
        f.write("\n")

print('Wiki structure generated successfully.')
