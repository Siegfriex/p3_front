import React, { useState } from 'react';
import { ChapterFrame } from '../../shared/ui/ChapterFrame';
import { PageFrame } from '../../shared/ui/PageFrame';
import { Badge } from '../../shared/ui/Badge';
import { ATLAS_NODES } from '../../shared/mock/storyData';
import { useOverlay } from '../../app/providers/OverlayProvider';
import { ReportedStatus, BehaviorType, AtlasNodeViewModel } from '../../shared/types/story';
import { RotateCcw, Info, Crosshair } from 'lucide-react';

export const ChapterAnswersAtlas: React.FC = () => {
  const { openEvidence } = useOverlay();

  // Max 4 Controls
  const [selectedStatus, setSelectedStatus] = useState<ReportedStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<BehaviorType | 'all'>('all');
  const [hoveredNode, setHoveredNode] = useState<AtlasNodeViewModel | null>(null);
  const [showNodeLabels, setShowNodeLabels] = useState<boolean>(true);

  const handleReset = () => {
    setSelectedStatus('all');
    setSelectedType('all');
    setHoveredNode(null);
  };

  const filteredNodes = ATLAS_NODES.filter((node) => {
    if (selectedStatus !== 'all' && node.status !== selectedStatus) return false;
    if (selectedType !== 'all' && node.type !== selectedType) return false;
    return true;
  });

  const behaviorTypesList: { type: BehaviorType; label: string; family: 'red' | 'amber' | 'blue' }[] = [
    { type: 'A1', label: '원론적 검토 표명', family: 'red' },
    { type: 'A2', label: '법령/예산 한계', family: 'amber' },
    { type: 'A3', label: '타 기관 이관', family: 'amber' },
    { type: 'A4', label: '현황 설명 대치', family: 'amber' },
    { type: 'A5', label: '실질 이행 완료', family: 'blue' },
    { type: 'A6', label: '수용 불가', family: 'red' },
    { type: 'A7', label: '수치 중심 답변', family: 'blue' },
    { type: 'A8', label: '자체 감사 진행', family: 'red' },
  ];

  return (
    <ChapterFrame id="answers" orderNumber="CHAPTER 04">
      <PageFrame>
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-serif text-6xl sm:text-8xl leading-none font-black italic text-[var(--color-ink)] select-none">
              04
            </span>
            <div className="pt-1">
              <Badge label="답변 지형도" variant="neutral" className="mb-2" />
              <h2 className="text-3xl sm:text-4xl font-serif font-light leading-tight tracking-tight text-[var(--color-ink)] mb-2">
                답변의 기하학:<br />어떻게 답했나
              </h2>
            </div>
          </div>
          <p className="type-body-l text-[var(--color-neutral-700)] max-w-2xl leading-relaxed">
            시정 요구와 답변 사이의 물리적 거리를 추적합니다. <br className="hidden sm:inline" />
            단순한 ‘완료’ 너머에 숨겨진 8가지 답변 패턴(A1~A8)의 질량과 좌표입니다.
          </p>
        </div>

        {/* Control Panel — Max 4 Controls */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-neutral-200)] p-4 md:p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Control 1: Status Filter */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--color-neutral-500)]">1. 처리상태:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="bg-[var(--color-paper)] border border-[var(--color-neutral-200)] px-2.5 py-1 text-xs font-mono rounded-none"
              >
                <option value="all">전체 상태 보기</option>
                <option value="complete">추진완료 (Blue)</option>
                <option value="active">추진중 (Amber)</option>
                <option value="unresolved">미완료/단절 (Red)</option>
              </select>
            </div>

            {/* Control 2: Behavior Type Filter */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--color-neutral-500)]">2. 답변유형 (A1~A8):</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="bg-[var(--color-paper)] border border-[var(--color-neutral-200)] px-2.5 py-1 text-xs font-mono rounded-none"
              >
                <option value="all">전체 8개 유형</option>
                {behaviorTypesList.map((b) => (
                  <option key={b.type} value={b.type}>
                    {b.type}: {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Control 3: Label Display Toggle */}
            <button
              onClick={() => setShowNodeLabels((prev) => !prev)}
              className="px-3 py-1 border border-[var(--color-neutral-200)] bg-[var(--color-paper)] font-mono text-xs text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] transition-colors"
            >
              3. 라벨 노출: {showNodeLabels ? 'ON' : 'OFF'}
            </button>

            {/* Control 4: Reset Button */}
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-[var(--color-ink)] text-[var(--color-paper)] font-mono text-xs flex items-center gap-1.5 hover:bg-[var(--color-neutral-700)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>4. 초기화</span>
            </button>
          </div>
        </div>

        {/* SVG Topic Atlas Renderer */}
        <div className="relative bg-[var(--color-surface)] border border-[var(--color-neutral-200)] p-4 md:p-8 overflow-hidden min-h-[500px]">
          {/* Grid Background Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%">
              <line x1="25%" y1="0" x2="25%" y2="100%" stroke="var(--color-neutral-700)" strokeDasharray="4 4" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--color-neutral-700)" />
              <line x1="75%" y1="0" x2="75%" y2="100%" stroke="var(--color-neutral-700)" strokeDasharray="4 4" />
              <line x1="0" y1="33%" x2="100%" y2="33%" stroke="var(--color-neutral-700)" strokeDasharray="4 4" />
              <line x1="0" y1="66%" x2="100%" y2="66%" stroke="var(--color-neutral-700)" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Interactive SVG Stage */}
          <svg viewBox="0 0 100 100" className="w-full h-[450px] overflow-visible">
            {/* Axis Labels */}
            <text x="2" y="5" fill="var(--color-neutral-500)" fontSize="3" fontFamily="monospace">
              질문 세분성 (Detail Level) ▲
            </text>
            <text x="75" y="98" fill="var(--color-neutral-500)" fontSize="3" fontFamily="monospace">
              답변 수용성 (Receptiveness) ►
            </text>

            {/* Tether Lines to Selected Node */}
            {hoveredNode && (
              <g stroke="var(--color-behavior-red-deep)" strokeWidth="0.5" strokeDasharray="1 1">
                <line x1={hoveredNode.x} y1="0" x2={hoveredNode.x} y2="100" />
                <line x1="0" y1={hoveredNode.y} x2="100" y2={hoveredNode.y} />
              </g>
            )}

            {/* Atlas Nodes */}
            {ATLAS_NODES.map((node) => {
              const isFilteredIn = filteredNodes.some((n) => n.id === node.id);
              const isHovered = hoveredNode?.id === node.id;

              let fillColor = 'var(--color-behavior-amber-deep)';
              if (node.family === 'red') fillColor = 'var(--color-behavior-red-deep)';
              if (node.family === 'blue') fillColor = 'var(--color-behavior-blue-deep)';

              return (
                <g
                  key={node.id}
                  onClick={() => openEvidence(node.representativeEvidenceIds[0] || 'ev-101')}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-opacity duration-300"
                  style={{ opacity: isFilteredIn ? (isHovered ? 1 : 0.85) : 0.15 }}
                >
                  {/* Outer Ring on Hover */}
                  {isHovered && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius / 5 + 3}
                      fill="none"
                      stroke={fillColor}
                      strokeWidth="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius / 5}
                    fill={fillColor}
                    stroke="var(--color-paper)"
                    strokeWidth="0.8"
                  />

                  {/* Center Dot */}
                  <circle cx={node.x} cy={node.y} r="0.8" fill="var(--color-paper)" />

                  {/* Label */}
                  {showNodeLabels && isFilteredIn && (
                    <text
                      x={node.x}
                      y={node.y + node.radius / 5 + 3.5}
                      textAnchor="middle"
                      fill="var(--color-ink)"
                      fontSize="2.4"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      {node.type}: {node.label} ({node.count}건)
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover / Selected Node Detail Card */}
          {hoveredNode && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 bg-[var(--color-paper)] border border-[var(--color-ink)] shadow-lg animate-fade-in z-20">
              <div className="flex items-center justify-between mb-2">
                <Badge label={hoveredNode.type} variant="behavior" family={hoveredNode.family} />
                <span className="type-mono text-xs text-[var(--color-neutral-500)]">
                  누적 {hoveredNode.count}건 (신뢰도 {hoveredNode.confidence}%)
                </span>
              </div>
              <h4 className="type-body-l font-serif font-bold text-[var(--color-ink)] mb-1">
                {hoveredNode.behaviorTitle}
              </h4>
              <p className="type-caption text-[var(--color-neutral-700)] mb-3">
                {hoveredNode.behaviorExcerpt}
              </p>
              <button
                onClick={() => openEvidence(hoveredNode.representativeEvidenceIds[0] || 'ev-101')}
                className="w-full py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)] font-mono text-xs flex items-center justify-center gap-1 hover:bg-[var(--color-neutral-700)] transition-colors"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>대표 증거 및 원문 보기</span>
              </button>
            </div>
          )}
        </div>

        {/* Legend Footnote */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--color-neutral-500)] border-t border-[var(--color-neutral-200)] pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[var(--color-behavior-red-deep)]" />
              Red Family (원론적 검토 / 수용불가 / 자체감사)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[var(--color-behavior-amber-deep)]" />
              Amber Family (법령예산 한계 / 타기관 이관 / 현황 대치)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[var(--color-behavior-blue-deep)]" />
              Blue Family (실질 완료 / 정량 수치 답변)
            </span>
          </div>
          <span>[Deterministic Atlas Fixture]</span>
        </div>
      </PageFrame>
    </ChapterFrame>
  );
};
