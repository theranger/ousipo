#nullable enable
using Statiq.Common;

namespace Sleepwalking.Theme;

public class NavItem {
	public enum ArchiveType { Months, Tags }
	
	public IDocument? Previous { get; set; }
	public IDocument? Next { get; set; }
	public bool IsPost { get; set; }
	public ArchiveType Type { get; set; }
}
