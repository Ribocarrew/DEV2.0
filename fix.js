const fs = require('fs');

const filesToFix = {
  'src/App.tsx': "import type { LensOption, Session } from './types';",
  'src/components/DiamondEngine.tsx': "import type { Card, Session } from '../types';",
  'src/components/DissonanceDetector.tsx': "import type { Session } from '../types';",
  'src/components/MethodLens.tsx': "import type { LensOption } from '../types';",
  'src/components/ShareModal.tsx': "import type { Session } from '../types';",
  'src/data/cards.ts': "import type { Card } from '../types';",
  'src/data/lenses.ts': "import type { LensOption } from '../types';",
  'src/hooks/useSessions.ts': "import type { Session } from '../types';",
  'src/utils/dissonance.ts': "import type { Card, LensOption } from '../types';",
  'src/utils/engine.ts': "import type { Card } from '../types';",
  'src/hooks/useClassSessions.ts': "import type { SharedScore } from '../utils/sharing';"
};

for (const [file, importStr] of Object.entries(filesToFix)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import type \{\} from '';/g, importStr);
  
  // Clean up unused React imports
  content = content.replace(/import React, \{ /g, 'import { ');
  content = content.replace(/import React from 'react';\r?\n/g, '');
  
  fs.writeFileSync(file, content);
}
