// src/components/MultiSelect.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MultiSelect.css";

const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) return;
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

const MultiSelect = ({
	options,
	value,
	onChange,
	placeholder = "Search for options",
	labelSelectAll = "Select All",
	id,
}) => {
	const containerRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	useOnClickOutside(containerRef, () => setOpen(false));

	const normalizedOptions = useMemo(
		() =>
			options.map((o) => ({
				id: String(o.id ?? o.value ?? o.name),
				label: String(o.name ?? o.label ?? o.value ?? ""),
				value: String(o.value ?? o.name ?? o.id),
			})),
		[options]
	);

	const filtered = useMemo(() => {
		if (!query) return normalizedOptions;
		const q = query.toLowerCase();
		// Move selected to top as in reference
		const items = normalizedOptions.filter((o) =>
			o.label.toLowerCase().includes(q)
		);
		const selectedSet = new Set(value);
		return items.sort((a, b) => {
			const aSel = selectedSet.has(a.value) ? 0 : 1;
			const bSel = selectedSet.has(b.value) ? 0 : 1;
			if (aSel !== bSel) return aSel - bSel;
			return a.label.localeCompare(b.label);
		});
	}, [query, normalizedOptions, value]);

	const selectedSet = useMemo(() => new Set(value), [value]);
	const allValues = useMemo(
		() => normalizedOptions.map((o) => o.value),
		[normalizedOptions]
	);
	const isAllSelected = value.length > 0 && value.length === allValues.length;

	const toggleItem = (val) => {
		if (selectedSet.has(val)) {
			onChange(value.filter((v) => v !== val));
		} else {
			onChange([...value, val]);
		}
	};

	const toggleAll = () => {
		if (isAllSelected) onChange([]);
		else onChange(allValues);
	};

	const removeChip = (val) => onChange(value.filter((v) => v !== val));
	const clearAll = () => onChange([]);

	return (
		<div className="ms-container" ref={containerRef}>
			<button
				type="button"
				id={id}
				className="ms-control"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}
			>
				<span className="ms-placeholder">
					{value.length === 0 ? placeholder : `${value.length}`}
				</span>
				{value.length > 0 && <span className="ms-count">{value.length}</span>}
				<span className="ms-caret">▾</span>
			</button>

			{open && (
				<div className="ms-popover" role="dialog" aria-labelledby={id}>
					<div className="ms-search">
						<input
							placeholder={placeholder}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							autoFocus
						/>
					</div>

					<div className="ms-list" role="listbox" aria-multiselectable="true">
						<label className="ms-item">
							<input type="checkbox" checked={isAllSelected} onChange={toggleAll} />
							<span>{labelSelectAll}</span>
						</label>

						{filtered.map((opt) => (
							<label key={opt.value} className="ms-item">
								<input
									type="checkbox"
									checked={selectedSet.has(opt.value)}
									onChange={() => toggleItem(opt.value)}
								/>
								<span>{opt.label}</span>
							</label>
						))}
					</div>

					<div className="ms-footer">
						<button type="button" className="ms-link" onClick={clearAll}>
							Clear all
						</button>
						<button type="button" className="ms-link" onClick={() => setOpen(false)}>
							Done
						</button>
					</div>
				</div>
			)}

			{value.length > 0 && (
				<div className="ms-chips" aria-live="polite">
					{normalizedOptions
						.filter((o) => selectedSet.has(o.value))
						.map((o) => (
							<span key={o.value} className="ms-chip">
								{o.label}
								<button
									aria-label={`Remove ${o.label}`}
									onClick={() => removeChip(o.value)}
								>
									×
								</button>
							</span>
						))}
					<button type="button" className="ms-link" onClick={clearAll}>
						Clear all
					</button>
				</div>
			)}
		</div>
	);
};

export default MultiSelect;
