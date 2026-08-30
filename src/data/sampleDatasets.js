/**
 * Sample datasets with built-in redundancies, duplicates, and contradictions
 * Perfect for quick college project demonstrations and viva testing.
 */

export const SAMPLE_DATASETS = [
  {
    id: 'cs-ai-research',
    name: 'computer_science_ai.txt',
    title: 'Computer Science & AI Model Research',
    description: 'Contains high redundancy, repeated claims, and duplicate AI architectural facts.',
    category: 'Artificial Intelligence',
    suggestedPrompts: [
      'What are the primary causes of latency in LLM processing?',
      'How does dataset reduction affect memory consumption?',
      'Summarize the core technical findings in the dataset.'
    ],
    text: `Artificial intelligence models rely heavily on high-quality training and prompt context data.
Artificial intelligence models rely heavily on high-quality training and prompt context data.
Uncleaned datasets often contain massive exact duplicate sentences that needlessly inflate token count.
Uncleaned datasets often contain massive exact duplicate sentences that needlessly inflate token count.
Transformer architectures use self-attention mechanisms to process tokens simultaneously across context windows.
Transformer architectures use self-attention mechanisms to process tokens simultaneously across context windows.

Semantic deduplication removes sentences that convey identical meaning using vector similarity embeddings.
Semantic deduplication identifies and eliminates sentences with redundant underlying meaning via vector embeddings.
Vector embeddings map semantic similarity across multidimensional embedding spaces.

Contradictions in raw datasets can confuse downstream reasoning engines during retrieval augmented generation.
Contradiction 1: Neural network learning rate should be set strictly to 0.01 for optimal convergence.
Contradiction 2: Neural network learning rate should never exceed 0.0001 to prevent gradient explosion.

Large language models consume GPU memory proportionally to the total prompt context length.
Large language models consume GPU memory proportionally to the total prompt context length.
Reducing context data by 40% typically decreases time-to-first-token latency by approximately 35%.
Reducing context dataset size by 40% improves inference latency by roughly 35%.

Data refinement pipelines apply exact deduplication, semantic clustering, and contradiction resolution.
Data refinement pipelines apply exact deduplication, semantic clustering, and contradiction resolution.
Information preservation ensures key facts remain available to downstream AI models.
Information preservation ensures key facts remain available to downstream AI models.`
  },
  {
    id: 'iot-smart-sensors',
    name: 'iot_traffic_noise_nodes.txt',
    title: 'IoT Dynamic Sensor Network & Traffic Noise',
    description: 'Sensor data logs with duplicate node readings, telemetry noise, and contradictory battery metrics.',
    category: 'IoT & Edge Computing',
    suggestedPrompts: [
      'What are the recommended noise threshold levels for urban sensor nodes?',
      'How do wireless sensor nodes manage battery power during peak hours?',
      'What dynamic reassignment strategies are proposed?'
    ],
    text: `Urban acoustic sensors monitor sound decibel levels across high-density traffic corridors.
Urban acoustic sensors monitor sound decibel levels across high-density traffic corridors.
Node 104 reported peak sound pressure of 88.5 dB at 08:30 AM near Hubballi Circle.
Node 104 reported peak sound pressure of 88.5 dB at 08:30 AM near Hubballi Circle.
Decibel thresholds above 85 dB trigger automated alerting protocols to municipal traffic controllers.

Wireless acoustic sensor nodes utilize solar-backed lithium ion power packs.
Wireless acoustic sensor nodes utilize solar-backed lithium ion power packs.
Battery management systems enter low-power sleep mode during low-traffic night windows.
Battery management systems enter low-power sleep mode during low-traffic night windows.

Contradiction Claim A: Sensor nodes transmit raw uncompressed audio data via LoRaWAN protocol.
Contradiction Claim B: LoRaWAN bandwidth is too restricted for raw audio; sensor nodes process FFT audio spectra locally.

Dynamic frequency reassignment allocates backup communication channels when packet loss exceeds 5%.
Dynamic frequency reassignment allocates backup communication channels when packet loss exceeds 5%.
Edge processing at the sensor node level reduces telemetry bandwidth by 60%.
Edge processing at the sensor node level reduces telemetry bandwidth by 60%.`
  },
  {
    id: 'environmental-renewable',
    name: 'renewable_energy_grid.txt',
    title: 'Renewable Microgrid Efficiency & Data Analysis',
    description: 'Energy efficiency logs with duplicate solar irradiance metrics and redundant grid capacity lines.',
    category: 'Green Tech & Energy',
    suggestedPrompts: [
      'What is the solar efficiency benchmark recorded in the dataset?',
      'What are the key storage challenges for renewable microgrids?',
      'Compare raw vs optimized energy predictions.'
    ],
    text: `Photovoltaic solar microgrids generate clean electrical energy for decentralized urban grids.
Photovoltaic solar microgrids generate clean electrical energy for decentralized urban grids.
Bifacial solar panels demonstrate 22.4% energy conversion efficiency under standard test conditions.
Bifacial solar panels demonstrate 22.4% energy conversion efficiency under standard test conditions.

Lithium iron phosphate battery storage balances intermittency during peak demand periods.
Lithium iron phosphate battery storage balances intermittency during peak demand periods.
Energy storage loss rates remain below 1.5% over 24-hour cycle periods.
Energy storage loss rates remain below 1.5% over 24-hour cycle periods.

Grid stability algorithms adjust inverter phase angles to prevent harmonic distortion.
Grid stability algorithms adjust inverter phase angles to prevent harmonic distortion.
Smart meters broadcast real-time telemetry every 15 seconds to cloud supervisory systems.
Smart meters broadcast real-time telemetry every 15 seconds to cloud supervisory systems.`
  }
];
