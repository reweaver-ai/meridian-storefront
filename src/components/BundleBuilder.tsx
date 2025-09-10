import { useState } from 'react';
import './BundleBuilder.css';

interface BundleBuilderProps { onSubmit?: (value: string) => void; }

export function BundleBuilder({}: BundleBuilderProps) {
  const [value, setValue] = useState('');
  return (
    <section className="bundlebuilder" aria-label="Bundle Builder">
      <div className="bundlebuilder__rowline">
        <input aria-label="Bundle Builder" aria-describedby="bundlebuilder-hint" className="bundlebuilder__input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="bundlebuilder__go" type="button">Go</button>
      </div>
      <p id="bundlebuilder-hint" className="bundlebuilder__hint">Press enter to apply.</p>
    </section>
  );
}
