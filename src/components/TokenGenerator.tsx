'use client';

import { useState, useCallback, useEffect } from 'react';
import { TOKEN_TYPES, CATEGORIES, generateToken, TokenTypeId, CategoryId } from '@/lib/token';
import styles from './TokenGenerator.module.css';

export default function TokenGenerator() {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<TokenTypeId>('random-64');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [copyError, setCopyError] = useState(false);

  const filteredTypes = activeCategory === 'all'
    ? TOKEN_TYPES
    : TOKEN_TYPES.filter(t => t.category === activeCategory);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setCopied(false);
    setCopyError(false);
    setTimeout(() => {
      setToken(generateToken(selectedType));
      setIsGenerating(false);
    }, 300);
  }, [selectedType]);

  const handleCopy = useCallback(async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  }, [token]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter to generate (when not in input)
      if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleGenerate();
        }
      }

      // Ctrl/Cmd + C to copy when token exists
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && token) {
        const selection = window.getSelection()?.toString();
        if (!selection) {
          e.preventDefault();
          handleCopy();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate, handleCopy, token]);

  const selectedTypeInfo = TOKEN_TYPES.find(t => t.id === selectedType);

  return (
    <div className={styles.container} role="main">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />

      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.iconWrapper} aria-hidden="true">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className={styles.title}>Token Generator</h1>
          <p className={styles.subtitle}>다양한 형식의 보안 토큰 생성</p>
        </header>

        <section aria-labelledby="category-label">
          <div id="category-label" className={styles.sectionLabel}>카테고리</div>
          <div className={styles.categoryTabs} role="tablist" aria-label="토큰 카테고리">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls="type-grid"
                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="type-label">
          <div id="type-label" className={styles.sectionLabel}>토큰 유형</div>
          <div
            id="type-grid"
            className={styles.typeGrid}
            role="listbox"
            aria-label="토큰 유형 선택"
            aria-activedescendant={selectedType}
          >
            {filteredTypes.map(type => (
              <button
                key={type.id}
                id={type.id}
                role="option"
                aria-selected={selectedType === type.id}
                className={`${styles.typeOption} ${selectedType === type.id ? styles.selected : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className={styles.typeName}>{type.name}</div>
                <div className={styles.typeDesc}>{type.desc}</div>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.selectedInfo} aria-live="polite">
          <span className={styles.selectedBadge}>{selectedTypeInfo?.name}</span>
          <span className={styles.selectedDesc}>{selectedTypeInfo?.desc}</span>
        </div>

        <div
          className={`${styles.tokenDisplay} ${token ? styles.hasToken : ''}`}
          role="region"
          aria-label="생성된 토큰"
          aria-live="polite"
        >
          {isGenerating ? (
            <div className={styles.generating} aria-label="토큰 생성 중">
              <span /><span /><span />
            </div>
          ) : token ? (
            <code className={styles.tokenText}>{token}</code>
          ) : (
            <span className={styles.placeholder}>버튼을 눌러 토큰을 생성하세요</span>
          )}
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.btnGenerate}
            onClick={handleGenerate}
            aria-label="토큰 생성 (Enter)"
            disabled={isGenerating}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            생성
          </button>
          <button
            className={`${styles.btnCopy} ${copied ? styles.copied : ''} ${copyError ? styles.error : ''}`}
            onClick={handleCopy}
            disabled={!token}
            aria-label={copied ? '복사됨' : copyError ? '복사 실패' : '토큰 복사 (Ctrl+C)'}
          >
            {copied ? (
              <>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                복사됨
              </>
            ) : copyError ? (
              <>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                복사 실패
              </>
            ) : (
              <>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                복사
              </>
            )}
          </button>
        </div>

        {/* Screen reader only: keyboard shortcut hints */}
        <div className="sr-only" aria-live="polite">
          Enter 키로 토큰 생성, Ctrl+C로 복사
        </div>
      </div>
    </div>
  );
}
