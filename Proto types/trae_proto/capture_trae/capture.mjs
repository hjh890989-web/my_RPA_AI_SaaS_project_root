import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const protoDir = 'c:\\Antigravity_Workspace\\my_RPA_AI_SaaS_project_root\\Proto types';
const artifactsDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\6f75a7c3-a687-4d42-92a2-9e16c43a5883\\artifacts';

if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1280, height: 800 } });
  const page = await browser.newPage();
  
  // 1. Login Page
  await page.goto('http://localhost:3000/login');
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot(page, 'capture_trae_01_login.png');
  
  // 2. Click COO Login
  await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const cooBtn = buttons.find(b => b.textContent.includes('COO') || b.textContent.includes('한성우'));
      if (cooBtn) {
          cooBtn.click();
      } else {
          const loginBtn = buttons.find(b => b.textContent.toLowerCase().includes('login') || b.textContent.includes('로그인'));
          if (loginBtn) loginBtn.click();
      }
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  if (!page.url().includes('dashboard')) {
      await page.goto('http://localhost:3000/dashboard');
      await new Promise(r => setTimeout(r, 1000));
  }
  await takeScreenshot(page, 'capture_trae_02_dashboard.png');

  // Final Order Routes
  const routes = [
      { url: '/log-entries', name: '03_log_entries' },
      { url: '/log-entries/review', name: '04_log_entries_review' },
      { url: '/dashboard/xai', name: '05_xai' },
      { url: '/audit-reports', name: '06_audit_reports' },
      { url: '/dashboard/performance', name: '07_performance' },
      { url: '/roi-calculator', name: '08_roi_calculator' },
      { url: '/admin/onboarding', name: '09_admin_onboarding' },
      { url: '/admin/voucher', name: '10_admin_voucher' },
      { url: '/dashboard/erp', name: '11_erp' },
      { url: '/dashboard/security', name: '12_security' },
  ];

  for (const route of routes) {
      await page.goto(`http://localhost:3000${route.url}`);
      await new Promise(r => setTimeout(r, 1500));
      await takeScreenshot(page, `capture_trae_${route.name}.png`);
  }

  await browser.close();
}

async function takeScreenshot(page, filename) {
    const protoPath = path.join(protoDir, filename);
    const artifactPath = path.join(artifactsDir, filename);
    await page.screenshot({ path: protoPath, fullPage: true });
    fs.copyFileSync(protoPath, artifactPath);
    console.log(`Saved ${filename}`);
}

run().catch(console.error);
