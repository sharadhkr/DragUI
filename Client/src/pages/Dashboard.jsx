import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              DropUI Docs
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Build UI visually, export code, and use CLI integration.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              DropUI lets you design with drag-and-drop components, save projects to the cloud, and pull generated frontend code into your local repository.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/builder"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400"
              >
                Open Builder
              </Link>
              <a
                href="#cli"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800"
              >
                CLI Commands
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
            <h2 className="text-xl font-semibold text-white">Quick Start</h2>
            <dl className="mt-6 space-y-5 text-sm leading-7 text-slate-300">
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <dt className="font-semibold text-white">1. Login</dt>
                <dd className="mt-2 text-slate-400">Use the app login page or CLI login to authenticate.</dd>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <dt className="font-semibold text-white">2. Create a project</dt>
                <dd className="mt-2 text-slate-400">Open the builder, drag components into the canvas, and style them.</dd>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <dt className="font-semibold text-white">3. Save & load</dt>
                <dd className="mt-2 text-slate-400">Save your design to the cloud and reload it later from the dashboard.</dd>
              </div>
            </dl>
          </div>
        </div>

        <section id="cli" className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">CLI</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Command reference</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-lg font-semibold text-white">Login</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-200">
                <code>dropui login</code>
              </pre>
              <p className="mt-3 text-slate-400">Authenticate the CLI with your DropUI account.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-lg font-semibold text-white">Pull project</h3>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-200">
                <code>dropui pull &lt;projectId&gt;</code>
              </pre>
              <p className="mt-3 text-slate-400">Fetch the generated UI code for a saved project into your local repo.</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h3 className="text-lg font-semibold text-white">Builder tips</h3>
            <ul className="mt-4 space-y-3 text-slate-400 list-disc list-inside">
              <li>Drag components from the sidebar to the canvas.</li>
              <li>Select elements to edit properties and class names.</li>
              <li>Save your work with a project name and load it later.</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}