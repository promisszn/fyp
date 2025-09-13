<template>
  <div class="landing">
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <img src="/logo.svg" alt="AutoPlan logo" class="logo" />
          <h1 class="app-name">AutoPlan</h1>
        </div>
        <nav class="nav">
          <a href="/login" class="btn signin primary-pill">Sign in</a>
        </nav>
      </div>
    </header>

    <main class="hero-viewport hero-full">
      <div class="hero-inner container">
        <div class="hero-left">
          <h2 class="headline">
            AutoPlan — Modern cadastral & topographic plan automation
          </h2>
          <p class="subhead">
            A web-based geospatial platform built to speed up cadastral and
            engineering surveys. Import coordinates or files and automatically compute areas and bearings, transform
            coordinate systems, and export submission-ready plans and reports.
          </p>

          <div class="cta-row">
            <a href="/dashboard" class="btn primary big elevated"
              >Try AutoPlan for free</a
            >
          </div>
        </div>

        <div class="hero-right">
          <div class="mock">
            <img src="@/assets/img/screenshot.jpeg" alt="AutoPlan screenshot" />
          </div>
        </div>
      </div>
    </main>

    <!-- Details section moved outside of hero -->
    <section class="details container">
      <div class="kpi-row">
        <div class="kpi">
          <div class="kpi-num">Reduce manual work</div>
          <div class="kpi-label">Fewer drafting errors, faster delivery</div>
        </div>
        <div class="kpi">
          <div class="kpi-num">Supports Geo</div>
          <div class="kpi-label">GeoJSON · Shp · DXF · CAD</div>
        </div>
        <div class="kpi">
          <div class="kpi-num">Secure</div>
          <div class="kpi-label">Encrypted storage & role access</div>
        </div>
      </div>

      <ul class="features">
        <li>Automated boundary detection & area computation</li>
        <li>Coordinate transforms and projection support</li>
        <li>Export-ready PDF, DXF and printable reports</li>
        <li>Designed for cadastral workflows in contexts like Nigeria</li>
      </ul>
    </section>
    <section class="how container">
      <h3>How it works</h3>
      <div class="steps">
        <article>
          <strong>1</strong>
          <h4>Add coordinates</h4>
          <p>Paste or enter parcel coordinates to begin.</p>
        </article>
        <article>
          <strong>2</strong>
          <h4>Draw & edit</h4>
          <p>Use drawing tools to annotate and refine parcel boundaries.</p>
        </article>
        <article>
          <strong>3</strong>
          <h4>Compute & export</h4>
          <p>Run automated checks, generate reports, and export files.</p>
        </article>
      </div>
    </section>

    <section class="testimonials container">
      <h3>Trusted by practitioners</h3>
      <div class="quotes">
        <blockquote>
          "AutoPlan cut our drafting time in half and the exports are
          submission-ready."
          <cite>— N. Engineer</cite>
        </blockquote>
        <blockquote>
          "The computation accuracy gives us confidence when submitting plans."
          <cite>— L. Surveyor</cite>
        </blockquote>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div>
          <strong>AutoPlan</strong>
          <p class="muted">Fast parcel planning for surveyors and engineers.</p>
        </div>
        <div class="links">
          <a href="/login">Sign in</a>
          <a href="/set-profile">Set up profile</a>
        </div>
      </div>
      <div class="container small">© <span id="year"></span> AutoPlan</div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear().toString();
});
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}
.site-header {
  padding: 20px 0;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 48px;
  height: 48px;
}
.app-name {
  font-size: 22px;
  margin: 0;
  font-weight: 600;
}
.nav .btn {
  text-decoration: none;
}
.signin {
  padding: 10px 14px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #111;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.signin:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(32, 33, 36, 0.06);
}

.hero-viewport {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
}
.hero-inner {
  display: flex;
  gap: 36px;
  align-items: center;
}
.hero-left {
  flex: 1;
}
.hero-right {
  width: 560px;
}
.headline {
  font-size: 44px;
  line-height: 1.02;
  margin: 0 0 12px 0;
  font-weight: 700;
}
.subhead {
  color: #505558;
  margin: 0 0 20px 0;
  font-size: 18px;
}
.cta-row {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
}
.btn.big {
  padding: 14px 20px;
  font-size: 16px;
}
.btn.primary {
  background: #0b63ff;
  color: white;
  box-shadow: 0 8px 30px rgba(11, 99, 255, 0.14);
}
.btn.outline {
  border: 1px solid rgba(11, 99, 255, 0.12);
  color: #0b63ff;
  background: transparent;
}

.kpi-row {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.kpi {
  text-align: left;
}
.kpi-num {
  font-size: 20px;
  font-weight: 700;
}
.kpi-label {
  color: #666;
  font-size: 13px;
}

.features {
  margin: 12px 0 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 16px;
  color: #444;
}
.features li::before {
  content: "•";
  margin-right: 6px;
  color: #0b63ff;
}

.mock {
  background: linear-gradient(180deg, #ffffff, #f2f6fb);
  border-radius: 16px;
  border: 1px solid #e8eef8;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}
.mock img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.how {
  padding: 40px 0;
}
.how h3 {
  margin: 0 0 18px 0;
}
.steps {
  display: flex;
  gap: 18px;
}
.steps article {
  background: white;
  padding: 18px;
  border-radius: 10px;
  flex: 1;
  border: 1px solid #f0f3f8;
}
.steps strong {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: #0b63ff;
  color: white;
  border-radius: 8px;
  text-align: center;
  line-height: 36px;
  margin-bottom: 8px;
}

.testimonials {
  padding: 20px 0;
}
.quotes {
  display: flex;
  gap: 16px;
}
blockquote {
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #eee;
  flex: 1;
}
cite {
  display: block;
  margin-top: 8px;
  color: #666;
  font-size: 13px;
}

.site-footer {
  border-top: 1px solid #eef2f6;
  padding: 26px 0;
  margin-top: 18px;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.footer-inner .muted {
  color: #666;
  margin: 4px 0 0 0;
}
.links a {
  margin-left: 12px;
  color: #0b63ff;
}
.small {
  margin-top: 14px;
  color: #8b949e;
}

@media (max-width: 980px) {
  .hero-inner {
    flex-direction: column;
  }
  .hero-right {
    width: 100%;
  }
  .mock {
    height: 300px;
  }
  .mock img {
    object-fit: contain;
  }
  .kpi-row {
    flex-wrap: wrap;
  }
  .steps {
    flex-direction: column;
  }
  .quotes {
    flex-direction: column;
  }
}
</style>
