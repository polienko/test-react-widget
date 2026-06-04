import { useEffect, useRef } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import ToncastWidgetLoader from '@toncast/widget-loader';


import { TonConnectUIProvider } from '@tonconnect/ui-react'; // это пришлось добавить


function ToncastBettingWidget() {

  const [tonconnect] = useTonConnectUI();
  const ref = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<InstanceType<Awaited<ReturnType<typeof ToncastWidgetLoader.load>>> | null>(null);

  useEffect(() => {
    let active = true;
    ToncastWidgetLoader.load()
      .then((Widget) => {
        if (!active || !ref.current) return;
        widgetRef.current = new Widget({
          tonconnect: { type: 'integrated', instance: tonconnect },
        widget: {
                "language": "en",
                "theme": "dark",
                "cssVars": {
                        "radius": "24px",
                        "density": "comfortable"
                },
                "layout": {
                        "grid": {
                                "mobile": 1,
                                "tablet": 3,
                                "desktop": 4
                        }
                },
                "referral": {
                        "address": "UQCNIc6wrgq_z4CrrHlpqgyymBnixFAmUWgg7XK_xxpDy-Ve",
                        "pct": 7
                }
        },
        });
        widgetRef.current.mount(ref.current);
      })
      .catch((err) => console.error('[ToncastWidget] load failed:', err));
    return () => { active = false; widgetRef.current?.dispose(); };
  }, [tonconnect]);


  return (
    <>
      <h1>text before</h1>
      <div ref={ref} style={{ width: '100%', height: '500px' }} />
	  <h1>text after</h1>
    </>
  );
}






function App() {
  return (
    <TonConnectUIProvider 
      manifestUrl="https://polienko.github.io/test-react-widget/tonconnect-manifest.json"
    >
      <ToncastBettingWidget />
    </TonConnectUIProvider>
  );
}



export default App;